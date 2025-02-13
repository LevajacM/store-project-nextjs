import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import { fetchSingleProduct, findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import SingleProductCard from "@/components/aceternity-ui/SingleProductCard";
import { ListCard } from "@/components/aceternity-ui/list-card";
import ShareButton from "@/components/single-product/ShareButton";
import SubmitReview from "@/components/reviews/SubmitReview";
import ProductReviews from "@/components/reviews/ProductReviews";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await fetchSingleProduct(params.id);
  const { name, image, company, description, price } = product;
  const dollarsPrice = formatCurrency(price);

  const { userId } = auth();
  const productId = product.id;

  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, productId));

  return (
    <section>
      <BreadCrumbs name={product.name} />
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE */}
        <div className='h-[250px] sm:h-[500px]'>
          <SingleProductCard
            image={image}
            alt={name}
            contClasses='w-full h-[250px] sm:h-[500px]'
            imageItemClasses='h-full rounded-xl w-full'
            imageClasses='border border-primary'
            classes=' w-full   rounded-xl object-cover  border border-primary/[0.3] h-full '
          />
        </div>
        {/* INFO */}
        <div className='pt-4'>
          <div className='relative flex flex-col gap-x-8 items-center border border-primary  lg:h-[500px] p-4 rounded-xl lg:overflow-y-auto'>
            <div>
              <h1 className='capitalize text-3xl font-bold pt-3'>{name}</h1>
            </div>
            <ProductRating productId={params.id} />
            <h4 className='text-xl mt-2'>{company}</h4>
            <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
              {dollarsPrice}
            </p>
            <p className='mt-6 leading-8 px-2  text-muted-foreground '>
              {description}
            </p>
            <AddToCart id={params.id} />
            <div className='flex items-center gap-x-2 absolute top-7 right-6'>
              <FavoriteToggleButton productId={params.id} />
              <ShareButton productId={params.id} name={name} />
            </div>
          </div>
        </div>
      </div>
      <ProductReviews productId={params.id} />
      {reviewDoesNotExist && <SubmitReview productId={params.id} />}
    </section>
  );
};

export default SingleProductPage;
