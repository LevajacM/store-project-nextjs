import { redirect } from "next/navigation";
import prisma from "./db";

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
