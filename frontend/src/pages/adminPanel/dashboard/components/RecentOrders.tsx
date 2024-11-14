import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Dummy data for orders
const orders = [
  { id: "20013", item: "Front Lights", quantity: 1, total: 1000 },
  { id: "20013", item: "Breakpads", quantity: 1, total: 0 },
  { id: "20012", item: "Breakpads", quantity: 4, total: 268.8 },
  { id: "10012", item: "Reverse Lights", quantity: 1, total: 6 },
  { id: "10013", item: "Oil", quantity: 1, total: 0 },
  { id: "10010", item: "Oil", quantity: 10, total: 200 },
  { id: "10011", item: "Front Lights", quantity: 100, total: 100000 },
  { id: "10", item: "Reverse Lights", quantity: 1, total: 6 },
  { id: "9", item: "Front Lights", quantity: 1, total: 7 },
  { id: "8", item: "washing", quantity: 1, total: 40 },
];

export default function RecentOrders() {
  return (
    <div className="w-full lg:w-2/3 bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Latest Orders</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.item}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 flex justify-between">
        <Button>Place New Order</Button>
        <Button variant="outline">View All Orders</Button>
      </div>
    </div>
  );
}
