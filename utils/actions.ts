"use server";

import { redirect } from "next/navigation";
import prisma from "./db";
import { currentUser, auth } from "@clerk/nextjs/server";
import {
  zodValidation,
  imageSchema,
  productSchema,
  reviewSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { ZodSchema } from "zod";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

const throwError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "There was an error",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const fetchSingleProduct = async (id: string) => {
  const singleProduct = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!singleProduct) {
    redirect(`/products`);
  }

  return singleProduct;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const data = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const result = zodValidation(data, productSchema);
    const resultImage = zodValidation({ image: file }, imageSchema);
    const imagePath = await uploadImage(resultImage.image);

    await prisma.product.create({
      data: {
        ...result,
        image: imagePath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return throwError(error);
  }
  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await getAdminUser();
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(deletedProduct.image);
    revalidatePath("/admin/products");
    return { message: "Product successfully removed" };
  } catch (error) {
    return throwError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const editProductAction = async (prevState: any, formData: FormData) => {
  await getAdminUser();
  try {
    const id = formData.get("id") as string;
    const data = Object.fromEntries(formData);
    const result = zodValidation(data, productSchema);

    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...result,
      },
    });

    revalidatePath(`/admin/products/${id}/edit`);
    return { message: "product updated successfully" };
  } catch (error) {
    return throwError(error);
  }
};

export const editProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;

    const validNewImage = zodValidation({ image }, imageSchema);
    const newImagePath = await uploadImage(validNewImage.image);
    await deleteImage(oldImageUrl);

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        image: newImagePath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product image updated successfully" };
  } catch (error) {
    return throwError(error);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();

  if (!user) redirect("/products");

  const favorite = await prisma.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },

    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavorite = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;

  try {
    if (favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await prisma.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }

    revalidatePath(pathname);
    return {
      message: favoriteId
        ? "Product removed from favorites"
        : "Product added to favorites",
    };
  } catch (error) {
    return throwError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await prisma.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};

//*********************** REVIEWS *******************/

export const createReview = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  // if(!user) redirect('/products')
  try {
    const data = Object.fromEntries(formData);
    const validFields = zodValidation(data, reviewSchema);

    await prisma.review.create({
      data: {
        ...validFields,
        clerkId: user.id,
      },
    });

    revalidatePath(`/products/${validFields.productId}`);
    return { message: "Review submitted successfully" };
  } catch (error) {
    return throwError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const fetchProductRating = async (productId: string) => {
  const result = await prisma.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: { productId },
  });
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await prisma.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();
  try {
    await prisma.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "Review removed successfully" };
  } catch (error) {
    return throwError(error);
  }
};

export const findExistingReview = async (userId: string, productId: string) => {
  return prisma.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

//********************* CART **********************/

export const fetchCartItems = async () => {
  const { userId } = auth();
  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });
  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("No such product");
  }
  return product;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId,
    },
    // includeProductClause!! {
    //   cartItems: {
    //     include: {
    //       product: true,
    //     },
    //   },
    // },
    include: includeProductClause,
  });
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }

  return cart;
};

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });
  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await prisma.cartItem.create({
      data: { amount, productId, cartId },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }

  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  });

  return { cartItems, currentCart };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();

  try {
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));

    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });

    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });

    await updateCart(cart);
  } catch (error) {
    return throwError(error);
  }
  redirect("/cart");
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "item removed from cart" };
  } catch (error) {
    return throwError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await prisma.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "cart updated" };
  } catch (error) {
    return throwError(error);
  }
};

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    cartId = cart.id;
    await prisma.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await prisma.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    orderId = order.id;
  } catch (error) {
    return throwError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();
  const orders = await prisma.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const fetchAdminOrders = async () => {
  const user = getAdminUser();
  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};
