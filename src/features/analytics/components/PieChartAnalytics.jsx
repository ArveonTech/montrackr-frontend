import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const PieChartAnalytics = ({ chartConfig, chartData, type, startDate, endDate }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 min-w-120">
        <CardTitle className={`capitalize`}>{type} breakdown</CardTitle>
        <CardDescription>
          {new Date(startDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          -
          {new Date(endDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-62.5 pb-0">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" label nameKey="label" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartAnalytics;
