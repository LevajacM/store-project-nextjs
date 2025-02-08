import { fetchFeaturedProducts } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

const FeaturedProducts = async () => {
  const products = await fetchFeaturedProducts();

  if (products.length < 1) {
    return <EmptyList />;
  }

  return (
    <section className='pt-24'>
      <SectionTitle
        words={[
          {
            text: "featured",
          },
          {
            text: "products",
            className: "text-primary dark:text-primary",
          },
        ]}
      />
      <ProductsGrid products={products} />
    </section>
  );
};

export default FeaturedProducts;
