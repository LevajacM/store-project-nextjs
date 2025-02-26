import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/utils/actions";

const CartPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const prevCart = await fetchOrCreateCart({ userId });
  const { currentCart, cartItems } = await updateCart(prevCart);
  if (cartItems.length === 0) {
    return (
      <SectionTitle
        words={[
          {
            text: "Empty",
          },
          {
            text: "Cart",
            className: "text-orange-500 dark:text-orange-500",
          },
        ]}
      />
    );
  }

  return (
    <>
      <SectionTitle
        words={[
          {
            text: "Your",
          },
          {
            text: "Cart",
            className: "text-orange-500 dark:text-orange-500",
          },
        ]}
      />
      <div className='mt-8 grid gap-4 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className='lg:col-span-4'>
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </>
  );
};

export default CartPage;
