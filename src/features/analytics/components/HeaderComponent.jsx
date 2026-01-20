import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import useAnalyticsFilter from "@/hooks/analytics/useAnalyticsFilters";
import useGetUserIdFromLocalStorage from "@/hooks/others/useGetUserIdFromLocalStorage ";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const typeList = [
  { title: "All", value: "all" },
  { title: "Income", value: "income" },
  { title: "Expense", value: "expense" },
];
const HeaderComponent = ({ type, startRange, endRange, mutateGetAnalytics }) => {
  const user_id = useGetUserIdFromLocalStorage();
  const { setFilter } = useAnalyticsFilter();

  const [formFilter, setFormFilter] = useState({
    type,
    startRange,
    endRange,
  });

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    mutateGetAnalytics({
      dataTransactions: { user_id },
      type: formFilter.type === "all" ? "" : formFilter.type,
      startRange: formFilter.startRange,
      endRange: formFilter.endRange,
    });
  }, [formFilter.type, formFilter.startRange, formFilter.endRange]);

  return (
    <header className="w-full px-10 mt-20 space-y-5 md:flex gap-4 md:space-y-0">
      <div>
        <Select
          value={formFilter.type === "" ? "all" : formFilter.type}
          onValueChange={(value) => {
            setFormFilter((prev) => ({ ...prev, type: value }));
            setFilter({ type: value, startRange: formFilter.startRange, endRange: formFilter.endRange });
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {typeList.map((type, index) => (
              <SelectItem value={type.value} key={index}>
                {type.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-5 sm:flex items-center sm:space-y-0 gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startRange ? format(startRange, "PPP") : "Pick a start range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(d) => {
                setFilter({ type, startRange: d.toISOString(), endRange });
                setStartDate(d);
                setFormFilter((prev) => ({
                  ...prev,
                  startRange: d ? d.toISOString() : "",
                }));
              }}
            />
          </PopoverContent>
        </Popover>
        <p>to</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endRange ? format(endRange, "PPP") : "Pick a end range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(d) => {
                setFilter({ type, startRange, endRange: d.toISOString() });
                setEndDate(d);
                setFormFilter((prev) => ({
                  ...prev,
                  endRange: d ? d.toISOString() : "",
                }));
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default HeaderComponent;
