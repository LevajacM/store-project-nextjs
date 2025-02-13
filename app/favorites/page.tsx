import { fetchUserFavorites } from "@/utils/actions";
import ProductsGrid from "@/components/products/ProductsGrid";
import SectionTitle from "@/components/global/SectionTitle";

const FavoritesPage = async () => {
  const favorites = await fetchUserFavorites();

  if (favorites.length < 1)
    return (
      <SectionTitle
        words={[
          {
            text: "You have no favorites",
          },
          {
            text: "yet",
            className: "text-orange-500 dark:text-orange-500",
          },
        ]}
      />
    );

  return (
    <div>
      <SectionTitle
        words={[
          {
            text: "Your",
          },
          {
            text: "Favorites",
            className: "text-orange-500 dark:text-orange-500",
          },
        ]}
      />
      <ProductsGrid products={favorites.map((item) => item.product)} />
    </div>
  );
};

export default FavoritesPage;
