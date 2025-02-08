import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";

const ProductRating = ({ id }: { id: string }) => {
  const rating = 4.2;
  const count = 25;

  const className = "flex gap-1 items-center text-md mt-1 mb-4";
  const countValue = `(${count}) reviews`;

  return (
    <span className={className}>
      <IoMdStar className='w-3 h-3' />
      {rating} {countValue}
    </span>
  );
};

export default ProductRating;
