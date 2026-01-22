import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useParamsControllers from "@/hooks/others/useParamsControllers";
import { cn } from "@/lib/utils";
import toTwoDecimal from "@/utils/analytics/toTwoDecimal";
import { useState } from "react";

const periodList = [
  { title: "Today", value: "today" },
  { title: "Weak", value: "weak" },
  { title: "month", value: "month" },
  { title: "year", value: "year" },
];

const MonthComparassion = ({ dataComparassion, period }) => {
  const [periodValue, setPeriodValue] = useState(period);
  const { setParam } = useParamsControllers();

  return (
    <section className="shadow w-fit h-fit p-4 mx-auto lg:mx-0 rounded">
      <header className="flex bg-card items-center gap-4 mb-2">
        <h1 className="capitalize">{period} Comparassion</h1>
        <Select
          value={periodValue}
          onValueChange={(value) => {
            setParam("period", value);
            setPeriodValue(value);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {periodList.map((type, index) => (
              <SelectItem value={type.value} key={index}>
                {type.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>
      <hr />
      <main className="mt-2">
        <h1>
          Income:{" "}
          <span className={cn(`font-JetBrains`, dataComparassion?.income < 0 ? "text-destructive" : dataComparassion?.income > 0 ? "text-primary" : "")}>
            {dataComparassion?.income > 0 && "+"}
            {toTwoDecimal(dataComparassion?.income)}%
          </span>
        </h1>
        <h1>
          Expense:{" "}
          <span className={cn(`font-JetBrains`, dataComparassion?.expense < 0 ? "text-destructive" : dataComparassion?.expense > 0 ? "text-primary" : "")}>
            {dataComparassion?.expense > 0 && "+"}
            {toTwoDecimal(dataComparassion?.expense)}%
          </span>
        </h1>
      </main>
    </section>
  );
};

export default MonthComparassion;
