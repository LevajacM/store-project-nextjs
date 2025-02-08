import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight '>
          <br />
          We're redefining the way people shop.
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8 text-muted-foreground '>
          Experience sound like never before – shop premium speakers,
          headphones, and audio gear for crystal-clear quality, immersive bass,
          and unbeatable performance. Elevate your sound today! 🎶
        </p>
        <Button asChild size='lg' className='mt-10'>
          <Link href='/products'>Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
};

export default Hero;
