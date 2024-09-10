import Charts from "./components/Charts";
import NewProducts from "./components/NewProducts";
import RecentOrders from "./components/RecentOrders";
import SummaryCards from "./components/SummaryCards";

export default function Dashboard() {
  return (
    <main className="flex-1 overflow-y-auto">
      <header className="bg-white shadow-sm">
        <div className="max-w-full mx-auto py-4 px-4 ">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <div className="max-w-full mx-auto px-4 ">
        <SummaryCards />
        <Charts />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-100">
        <RecentOrders />
        <NewProducts />
      </div>
    </main>
  );
}
