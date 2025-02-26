import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SectionTitle from "@/components/global/SectionTitle";
import { fetchAdminOrders } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";

const SalesPage = async () => {
  const orders = await fetchAdminOrders();

  return (
    <>
      <SectionTitle
        words={[
          { text: "All" },
          { text: "Orders", className: "text-orange-500 dark:text-orange-500" },
        ]}
      />
      <Table>
        <TableCaption>Total Orders : {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((item) => {
            const date = formatDate(item.createdAt);
            return (
              <TableRow key={item.id}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.products}</TableCell>
                <TableCell>{formatCurrency(item.orderTotal)}</TableCell>
                <TableCell>{formatCurrency(item.tax)}</TableCell>
                <TableCell>{formatCurrency(item.shipping)}</TableCell>
                <TableCell>{date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default SalesPage;
