import EmptyList from "@/components/global/EmptyList";
import { deleteProductAction, fetchAdminProducts } from "@/utils/actions";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconBtn } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

const AdminProductsPage = async () => {
  const items = await fetchAdminProducts();
  if (items.length < 1) return <EmptyList />;

  return (
    <section>
      <Table>
        <TableCaption className='capitalize'>
          Total products : {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className='!pl-5'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id, name, company, price } = item;
            const dollarsPrice = formatCurrency(price);
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/products/${id}`}
                    className='underline text-muted-foreground tracking-wide capitalize'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{dollarsPrice}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/admin/products/${id}/edit`}>
                    <IconBtn actionType='edit' />
                  </Link>
                  <DeleteProduct productId={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
};

function DeleteProduct({ productId }: { productId: string }) {
  const deleteProduct = deleteProductAction.bind(null, { productId });
  return (
    <FormContainer action={deleteProduct}>
      <IconBtn actionType='delete' />
    </FormContainer>
  );
}

export default AdminProductsPage;
