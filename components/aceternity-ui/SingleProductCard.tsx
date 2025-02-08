import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./3d-card";

const SingleProductCard = ({
  image,
  alt,
  classes,
  imageClasses,
  imageItemClasses,
  contClasses,
}: {
  image: string;
  alt: string;
  classes: string;
  imageClasses?: string;
  imageItemClasses?: string;
  contClasses?: string;
}) => {
  return (
    <CardContainer className={`inter-var ${contClasses}`}>
      <CardBody
        className={`relative group/card   dark:bg-black dark:border-white/[0.2] border-black/[0.1] ${classes}   `}
      >
        <CardItem
          translateZ='100'
          className={`w-full h-full  ${imageItemClasses}`}
        >
          <div
            className={` w-full h-full overflow-hidden object-cover rounded-xl group-hover/card:shadow-xl `}
          >
            <Image
              src={image}
              fill
              className={`${imageClasses}  object-cover rounded-xl h-[500px]  group-hover/card:shadow-xl `}
              sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw'
              alt={alt}
              priority
            />
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default SingleProductCard;
