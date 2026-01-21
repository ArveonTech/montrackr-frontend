import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import getXAxisDataKey from "@/hooks/analytics/getXAxisDataKey";

const ChartAnalytics = ({ dataAnalytics, type, startRange, endRange }) => {
  let chartConfig = {
    income: {
      label: "Income",
      color: "var(--chart-1)",
    },
    expense: {
      label: "Expense",
      color: "#ca3214",
    },
  };

  const datakey = getXAxisDataKey(((startRange = { startRange }), (endRange = { endRange })));

  return (
    <>
      {dataAnalytics && (
        <Card className="h-100 lg:h-130 flex flex-col">
          <CardHeader className="shrink-0">
            <CardTitle className={`capitalize`}>{type === "income" ? "Income" : type === "Expense" ? "expense" : "Income and Expense"}</CardTitle>
            <CardDescription>Showing total {type === "income" ? "income" : type === "expense" ? "expense" : "income and expense"} for this months</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart data={dataAnalytics} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey={datakey} tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(_, payload) => `${datakey} ${payload?.[0]?.payload?.[datakey]}`} />} />

                <defs>
                  <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ca3214" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ca3214" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                {(type === "income" || type === "") && <Area dataKey="income" type="monotone" fill="url(#fillIncome)" stroke="var(--chart-1)" fillOpacity={0.4} />}

                {(type === "expense" || type === "") && <Area dataKey="expense" type="monotone" fill="url(#fillExpense)" stroke="#ca3214" fillOpacity={0.4} />}

                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChartAnalytics;
