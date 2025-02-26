import Link from "next/link";
import { TfiViewListAlt } from "react-icons/tfi";
import { BsGrid3X3Gap } from "react-icons/bs";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { fetchAllProducts } from "@/utils/actions";

const ProductsContainer = async ({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) => {
  const products = await fetchAllProducts({ search });
  const totalProducts = products.length;
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <>
      {/* HEADER */}
      <section>
        <div className='flex justify-between items-center'>
          <h4 className='font-medium text-lg'>
            {totalProducts} product
            {(totalProducts > 1 && "s") || (totalProducts === 0 && "s")}
          </h4>
          <div className='flex flex-row gap-x-4'>
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size='icon'
              asChild
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <BsGrid3X3Gap />
              </Link>
            </Button>
            <Button
              variant={layout === "list" ? "default" : "ghost"}
              size='icon'
              asChild
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <TfiViewListAlt />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className='mt-4' />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no products matched your search
          </h5>
        ) : layout === "list" ? (
          <ProductsList products={products} />
        ) : (
          <ProductsGrid products={products} />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
