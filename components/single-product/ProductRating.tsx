import { fetchProductRating } from "@/utils/actions";
import { IoMdStar } from "react-icons/io";

const ProductRating = async ({ productId }: { productId: string }) => {
  const { count, rating } = await fetchProductRating(productId);

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
