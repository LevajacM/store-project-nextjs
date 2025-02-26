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
import { fetchUserOrders } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";

const OrdersPage = async () => {
  const orders = await fetchUserOrders();

  return (
    <>
      <SectionTitle
        words={[
          { text: "Your" },
          { text: "Orders", className: "text-orange-500 dark:text-orange-500" },
        ]}
      />
      <Table>
        <TableCaption>Total Orders : {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
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

export default OrdersPage;
