import { IoMdStarOutline, IoMdStar } from "react-icons/io";

const Rating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className='flex items-center gap-x-1'>
      {stars.map((item, ind) => {
        if (item) {
          return <IoMdStar key={ind} className='w-3 h-3 text-primary' />;
        } else {
          return (
            <IoMdStarOutline key={ind} className='w-3 h-3 text-grey-400' />
          );
        }
      })}
    </div>
  );
};

export default Rating;
