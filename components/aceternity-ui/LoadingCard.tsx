import { Spinner } from "@heroui/spinner";
import { CardBody, CardContainer, CardItem } from "./3d-card";

const LoadingThreeDCard = ({
  classes,
  imageClasses,
  imageItemClasses,
  contClass,
}: {
  classes: string;
  imageClasses?: string;
  imageItemClasses?: string;
  contClass?: string;
}) => {
  return (
    <CardContainer className={`inter-var ${contClass}`}>
      <CardBody
        className={`relative group/card   dark:bg-black dark:border-white/[0.2] border-black/[0.1] ${classes}   border`}
      >
        <CardItem translateZ='100' className={`w-full ${imageItemClasses}`}>
          <div
            className={`${imageClasses} w-full h-full object-cover rounded-xl group-hover/card:shadow-xl `}
          >
            <Spinner color='primary' label='Loading...' />
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default LoadingThreeDCard;
