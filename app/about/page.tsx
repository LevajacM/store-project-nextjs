import SectionTitle from "@/components/global/SectionTitle";

const AboutPage = () => {
  const words = [
    {
      text: "We",
      className:
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-wide",
    },
    {
      text: "Love",
      className:
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-wide",
    },

    {
      text: "Sound",
      className:
        "text-primary dark:text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-wide",
    },
    {
      text: "Store",
      className:
        "text-primary dark:text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-wide",
    },
  ];

  return (
    <section>
      <SectionTitle words={words} titleClass='items-center' />
      <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground'>
        "Step into the world of unparalleled audio excellence where every note,
        beat, and melody comes to life with our top-tier speakers, headphones,
        and sound systems. From powerful bass to crisp highs, we bring you the
        best in audio technology. Whether you're a music lover, gamer, or
        audiophile, our curated collection ensures premium quality, cutting-edge
        design, and unbeatable performance. Transform your listening experience
        and feel the difference with our expertly crafted audio solutions.
        Elevate your sound, elevate your life because you deserve nothing but
        the best." 🎶🔊
      </p>
    </section>
  );
};

export default AboutPage;
