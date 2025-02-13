import { TypewriterEffectSmooth } from "../aceternity-ui/typewriter-effect";
import { Separator } from "../ui/separator";

const SectionTitle = ({
  words,
  titleClass,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  titleClass?: string;
}) => {
  return (
    <>
      <div className={`flex flex-col  justify-center ${titleClass}`}>
        <TypewriterEffectSmooth words={words} />
      </div>
      <Separator className='mb-8' />
    </>
  );
};

export default SectionTitle;

// const words = [
//   {
//     text: "neki",
//   },
//   {
//     text: "neki",
//   },
//   {
//     text: "naslov",
//     className: "text-blue-500 dark:text-orange-500",
//   },
// ];
