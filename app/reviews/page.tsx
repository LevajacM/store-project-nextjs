import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";
import ReviewCard from "@/components/reviews/ReviewCard";
import SectionTitle from "@/components/global/SectionTitle";
import FormContainer from "@/components/form/FormContainer";
import { IconBtn } from "@/components/form/Buttons";

const ReviewsPage = async () => {
  const reviews = await fetchProductReviewsByUser();

  if (reviews.length < 1)
    return (
      <>
        <SectionTitle
          words={[
            {
              text: "Your",
            },
            {
              text: "reviews",
              className: "text-orange-500 dark:text-orange-500",
            },
          ]}
        />
        <section className='grid md:grid-cols-2 gap-8 mt-4'>
          <h4 className='text-xs sm:text-sm md:text-lg lg:text-xl'>
            You don't have any reviews...
          </h4>
        </section>
      </>
    );

  return (
    <>
      <SectionTitle
        words={[
          {
            text: "Your",
          },
          {
            text: "reviews",
            className: "text-orange-500 dark:text-orange-500",
          },
        ]}
      />
      <section className='grid md:grid-cols-2 gap-8 mt-4'>
        {reviews.map((item) => {
          const { rating, comment } = item;
          const { name, image } = item.product;
          const reviewInfo = {
            name,
            comment,
            rating,
            image,
          };
          return (
            <ReviewCard key={item.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={item.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
};

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <div>
      <FormContainer action={deleteReview}>
        <IconBtn actionType='delete' />
      </FormContainer>
    </div>
  );
};

export default ReviewsPage;
