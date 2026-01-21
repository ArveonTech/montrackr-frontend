import { Pie, PieChart } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const PieChartAnalytics = ({ chartConfig, chartData }) => {
  return (
    <ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-62.5 pb-0">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="value" label nameKey="label" />
      </PieChart>
    </ChartContainer>
  );
};

export default PieChartAnalytics;
