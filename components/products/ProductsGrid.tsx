import Link from "next/link";
import { Product } from "@prisma/client";
import { ThreeDCard } from "../aceternity-ui/ThreeDCard";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "./FavoriteToggleButton";

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className='pt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((item) => {
        const { name, company, price, image } = item;
        const id = item.id;
        const dollarsPrice = formatCurrency(price);

        return (
          <article
            key={id}
            className='relative w-auto sm:w-[22rem]  h-auto mx-auto'
          >
            <Link href={`/products/${id}`}>
              <ThreeDCard
                name={name}
                company={company}
                price={price}
                image={image}
                classes='bg-gray-50 w-auto w-[19rem] sm:w-[22rem]  h-auto rounded-xl p-6 sm:max-w-xs'
                imageClasses='h-60'
                imageItemClasses='mt-4'
              />
            </Link>
            <div className='absolute top-10 right-6 z-10'>
              <FavoriteToggleButton productId={id} />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
