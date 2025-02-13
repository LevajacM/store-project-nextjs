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

const fetchProduct = async () => {};

export const fetchOrCreateCart = async () => {};

const updateOrCreateCartItem = async () => {};

export const updateCart = async () => {};

export const addToCartAction = async () => {};

export const removeCartItemAction = async () => {};

export const updateCartItemAction = async () => {};
