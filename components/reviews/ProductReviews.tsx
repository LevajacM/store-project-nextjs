import { fetchProductReviews } from "@/utils/actions";
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";

const ProductReviews = async ({ productId }: { productId: string }) => {
  const reviews = await fetchProductReviews(productId);

  if (reviews.length < 1) {
    return (
      <section className='mt-16'>
        <SectionTitle
          words={[
            {
              text: "Product",
            },
            {
              text: "reviews",
              className: "text-orange-500 dark:text-orange-500",
            },
          ]}
        />
        <h5 className='mb-8'>There are no reviews for this item...</h5>
      </section>
    );
  }

  return (
    <section className='mt-8'>
      <SectionTitle
        words={[
          {
            text: "Product",
          },
          {
            text: "reviews",
            className: "text-orange-500 dark:text-orange-500",
          },
        ]}
      />
      <div className='grid md:grid-cols-2 gap-[60px] my-8'>
        {reviews.map((item) => {
          const { comment, rating, authorImageUrl, authorName } = item;
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
          };
          return <ReviewCard key={item.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </section>
  );
};

export default ProductReviews;
