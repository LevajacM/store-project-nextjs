import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";
import hero4 from "@/public/images/hero4.jpg";
import hero5 from "@/public/images/hero5.jpg";
import { ThreeDCard } from "../aceternity-ui/ThreeDCard";

const images = [hero2, hero3, hero4, hero5];
console.log(hero1.src);

const HeroCarousel = () => {
  console.log(hero1.src);

  return (
    <div className='hidden xl:block'>
      <Carousel>
        <CarouselContent>
          <CarouselItem key={5}>
            <ThreeDCard
              image={hero1.src}
              classes='bg-white w-[522px] h-[24rem] rounded-xl object-cover pt-4 px-6 border border-black/[0.3]  '
              imageClasses='h-[21rem] '
              imageItemClasses='border border-black/[0.3] dark:border-white/[0.3] rounded-xl'
              prior={true}
            ></ThreeDCard>
          </CarouselItem>
          {images.map((item, i) => {
            return (
              <CarouselItem key={i}>
                <ThreeDCard
                  image={item.src}
                  classes='bg-white w-[522px] h-[24rem] rounded-xl object-cover pt-4 px-6 border border-black/[0.3]  '
                  imageClasses='h-[21rem] '
                  imageItemClasses='border border-black/[0.3] dark:border-white/[0.3] rounded-xl'
                >
                  {/* <Image
                    src={item}
                    alt={`Hero image ${i + 1}`}
                    className='w-full h-[24rem] rounded-md object-cover'
                    priority
                  /> */}
                </ThreeDCard>
                {/* <Card>
                  <CardContent className='p-2'>
                    <Image
                      src={item}
                      alt={`Hero image ${i + 1}`}
                      className='w-full h-[24rem] rounded-md object-cover'
                      priority
                    />
                  </CardContent>
                </Card> */}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
