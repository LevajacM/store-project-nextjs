import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import { fetchSingleProduct } from "@/utils/actions";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import SingleProductCard from "@/components/aceternity-ui/SingleProductCard";
import { ListCard } from "@/components/aceternity-ui/list-card";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await fetchSingleProduct(params.id);
  const { name, image, company, description, price } = product;
  const dollarsPrice = formatCurrency(price);

  return (
    <section>
      <BreadCrumbs name={product.name} />
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE */}
        <div className=' h-[500px]'>
          <SingleProductCard
            image={image}
            alt={name}
            contClasses='w-full h-[500px]'
            imageItemClasses='h-full rounded-xl w-full'
            imageClasses='border border-primary'
            classes=' w-full   rounded-xl object-cover  border border-primary/[0.3] h-full '
          />
        </div>
        {/* INFO */}
        <div className='pt-4'>
          <div className='relative flex flex-col gap-x-8 items-center border border-primary h-[500px] p-4 rounded-xl overflow-y-auto'>
            <div>
              <h1 className='capitalize text-3xl font-bold pt-3'>{name}</h1>
            </div>
            <ProductRating id={params.id} />
            <h4 className='text-xl mt-2'>{company}</h4>
            <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
              {dollarsPrice}
            </p>
            <p className='mt-6 leading-8 px-2  text-muted-foreground '>
              {description}
            </p>
            <AddToCart id={params.id} />
            <div className='absolute top-7 right-6'>
              <FavoriteToggleButton productId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
