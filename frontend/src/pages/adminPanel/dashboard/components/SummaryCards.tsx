import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const SummaryCards = () => {
  const summaryCards = [
    { title: "Today's Sale", value: "$0.00", color: "bg-blue-100" },
    { title: "Total Customers", value: "16", color: "bg-yellow-100" },
    { title: "Total Vehicles", value: "18", color: "bg-green-100" },
    { title: "Total Products", value: "11", color: "bg-red-100" },
  ];

  return (
    <div className="grid gap-4 my-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card, index) => (
        <Card key={index} className={`${card.color} w-full`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
