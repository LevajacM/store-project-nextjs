import Rating from "./Rating";
import Comment from "./Comment";
import { Review3DCard } from "../aceternity-ui/Review3DCard";

type ReviewCardProps = {
  reviewInfo: {
    comment: string;
    rating: number;
    name: string;
    image: string;
  };
  children?: React.ReactNode;
};

const ReviewCard = ({ reviewInfo, children }: ReviewCardProps) => {
  return (
    <Review3DCard
      name={reviewInfo.name}
      rating={<Rating rating={reviewInfo.rating} />}
      comment={<Comment comment={reviewInfo.comment} />}
      image={reviewInfo.image}
      classes='w-full'
      children={children}
    />
  );
};

export default ReviewCard;
