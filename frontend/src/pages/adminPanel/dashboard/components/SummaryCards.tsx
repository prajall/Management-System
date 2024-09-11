import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, DollarSign, Package, Users } from "lucide-react";

const SummaryCards = () => {
  const summaryCards = [
    {
      title: "Today's Sale",
      value: "$1,234.56",
      change: "+8.2%",
      icon: DollarSign,
    },
    {
      title: "Total Customers",
      value: "1,628",
      change: "+12 this week",
      icon: Users,
    },
    {
      title: "Total Vehicles",
      value: "342",
      change: "+5 this month",
      icon: Car,
    },
    {
      title: "Total Products",
      value: "1,156",
      change: "+23 new items",
      icon: Package,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card, index) => (
        <Card key={index} className="w-full bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-primary">
              {card.value}
            </div>
            <p className="text-xs text-primary mt-1">{card.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
