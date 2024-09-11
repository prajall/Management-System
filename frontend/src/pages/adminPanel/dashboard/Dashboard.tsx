import Charts from "./components/Charts";
import NewProducts from "./components/NewProducts";
import RecentOrders from "./components/RecentOrders";
import SummaryCards from "./components/SummaryCards";

export default function Dashboard() {
  return (
    <main className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-full mx-auto ">
        <SummaryCards />
        <Charts />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        <RecentOrders />
        <NewProducts />
      </div>
    </main>
  );
}
