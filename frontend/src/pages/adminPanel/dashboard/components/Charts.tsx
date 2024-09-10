import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
const Charts = () => {
  const salesData = [
    { month: "Jan", sales: 4000, purchases: 2400, expenses: 2400 },
    { month: "Feb", sales: 3000, purchases: 1398, expenses: 2210 },
    { month: "Mar", sales: 2000, purchases: 9800, expenses: 2290 },
    { month: "Apr", sales: 2780, purchases: 3908, expenses: 2000 },
    { month: "May", sales: 1890, purchases: 4800, expenses: 2181 },
    { month: "Jun", sales: 2390, purchases: 3800, expenses: 2500 },
    { month: "Jul", sales: 3490, purchases: 4300, expenses: 2100 },
  ];

  const expenseData = [
    { category: "Rent", amount: 2000 },
    { category: "Utilities", amount: 1500 },
    { category: "Salaries", amount: 5000 },
    { category: "Supplies", amount: 1000 },
    { category: "Marketing", amount: 800 },
    { category: "Insurance", amount: 1200 },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="overflow-hidden w-full">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg lg:text-xl">
            Sales and Purchase Report Summary - 2024
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 lg:p-6">
          <ChartContainer
            config={{
              sales: { label: "Sales", color: "hsl(var(--chart-1))" },
              purchases: {
                label: "Purchases",
                color: "hsl(var(--chart-2))",
              },
              expenses: {
                label: "Expenses",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[200px] sm:h-[250px] lg:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="purchases"
                  stroke="var(--color-purchases)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--color-expenses)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg lg:text-xl">
            Expense Statement - 2024
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 lg:p-6">
          <ChartContainer
            config={{
              amount: { label: "Amount", color: "hsl(var(--chart-1))" },
            }}
            className="h-[200px] sm:h-[250px] lg:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={expenseData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 8, textAnchor: "end" }}
                  height={60}
                  angle={-45}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill="var(--color-amount)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Charts;
