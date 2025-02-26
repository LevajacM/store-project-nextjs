import LoadingThreeDCard from "../aceternity-ui/LoadingCard";

const LoadingContainer = () => {
  return (
    <div className='pt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <LoadingProduct />
      <LoadingProduct />
      <LoadingProduct />
    </div>
  );
};

const LoadingProduct = () => {
  return (
    <LoadingThreeDCard
      classes='bg-gray-50 w-[50vw] sm:w-[22rem]  h-[394px] rounded-xl p-6'
      imageClasses='flex justify-center mt-36'
    />
  );
};

export default LoadingContainer;
