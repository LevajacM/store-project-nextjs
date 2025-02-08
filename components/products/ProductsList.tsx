import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { ListCard } from "../aceternity-ui/list-card";
import { Product } from "@prisma/client";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((item) => {
        const { name, company, price, image } = item;
        const id = item.id;
        const dollarsPrice = formatCurrency(price);

        return (
          <article key={id} className='relative h-72 mb-[200px] md:-mb-6 '>
            <Link href={`/products/${id}`}>
              <ListCard containerClassName='  hover:shadow-xl border border-black/[0.3] dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]'>
                <div className='gap-y-8 grid md:grid-cols-3'>
                  <div className='relative h-64 md:h-48 md:w-48'>
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
                      priority
                      className='w-full rounded-xl object-cover'
                    />
                  </div>
                  <div>
                    <h2 className='text-xl font-semibold capitalize'>{name}</h2>
                    <h4 className='text-muted-foreground'>{company}</h4>
                  </div>
                  <p className='text-muted-foreground text-md md:ml-auto'>
                    {dollarsPrice}
                  </p>
                </div>
              </ListCard>
            </Link>
            <div className='absolute -bottom-[136px] right-[47px] sm:-bottom-[136px] md:bottom-16 sm:right-[38px] md:right-[36px] z-10'>
              <FavoriteToggleButton productId={id} />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsList;
