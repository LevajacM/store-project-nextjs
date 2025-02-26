"use client";

import { Card } from "../ui/card";
import { FirstCol, SecondCol, FourthCol } from "./CartItemColumns";
import ThirdColumn from "./ThirdColumn";
import { CartItemWithProduct } from "@/utils/types";

const CartItemsList = ({ cartItems }: { cartItems: CartItemWithProduct[] }) => {
  return (
    <div>
      {cartItems.map((item) => {
        const { id, amount } = item;
        const { price, company, name, image, id: productId } = item.product;
        return (
          <Card
            key={id}
            className='flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4'
          >
            <FirstCol image={image} name={name} />
            <SecondCol name={name} company={company} productId={productId} />
            <ThirdColumn id={id} quantity={amount} />
            <FourthCol price={price} />
          </Card>
        );
      })}
    </div>
  );
};

export default CartItemsList;
