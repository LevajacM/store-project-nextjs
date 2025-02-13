import { GoHeartFill } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton, CardSubmitButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoriteToggleButton = async ({ productId }: { productId: string }) => {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;

  const favoriteId = await fetchFavoriteId({ productId });

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
};
export default FavoriteToggleButton;
