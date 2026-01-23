import { useState } from "react";
import { Button } from "@/components/ui/button";
import useExport from "@/hooks/profile/useExport";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const ExportItem = ({ accessToken }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [errorExport, setErrorExport] = useState("");

  const [startRange, setStartRange] = useState("");
  const [endRange, setEndRange] = useState("");

  const { mutate: doExport, isLoading } = useExport();

  const onExport = () => {
    // default to year range if empty
    const start = startRange || new Date(new Date().getFullYear(), 0, 1).toISOString();
    const end = endRange || new Date(new Date().getFullYear(), 11, 31).toISOString();

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate < startDate) {
      setErrorExport("start date must be earlier than end date");
      return;
    }

    setErrorExport("");

    doExport(
      { startRange: start, endRange: end, accessToken },
      {
        onSuccess: (blob) => {
          // create download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "MontTrackr.xlsx");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        },
      },
    );
  };

  return (
    <div className="bg-card rounded-md border p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm">Export</div>
        <div className="flex gap-2 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className={`cursor-pointer flex`} size="sm">
                <Download />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>

              <DialogDescription></DialogDescription>
              <div className="flex justify-around items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(d) => {
                        setStartDate(d);
                        setStartRange(d ? d.toISOString() : "");
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <p>to</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(d) => {
                        setEndDate(d);
                        setEndRange(d ? d.toISOString() : "");
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {errorExport ? <p className="text-xs text-red-500 italic">*{errorExport}</p> : null}

              <Button onClick={onExport} disabled={isLoading} size="sm">
                {isLoading ? "Exporting..." : "Export"}
              </Button>
              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ExportItem;
