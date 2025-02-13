"use client";

import LoadingThreeDCard from "@/components/aceternity-ui/LoadingCard";
import SectionTitle from "@/components/global/SectionTitle";

const ReviewsLoadingPage = () => {
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
      <section className='grid md:grid-cols-2 gap-[60px] mt-4'>
        <LoadingThreeDCard
          classes='w-[100%] h-auto rounded-xl'
          contClass='w-full'
          imageClasses='flex items-center justify-center py-16'
        />
        <LoadingThreeDCard
          classes='w-full h-auto rounded-xl'
          contClass='w-full'
          imageClasses='flex items-center justify-center py-16'
        />
      </section>
    </>
  );
};

export default ReviewsLoadingPage;
