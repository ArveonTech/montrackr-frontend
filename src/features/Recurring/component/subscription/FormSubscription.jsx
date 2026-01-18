import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, use, useEffect, useState } from "react";
import Loading from "@/features/others/Loading";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const CATEGORIES = [
  { label: "Adobe", value: "adobe" },
  { label: "Canva", value: "canva" },
  { label: "Coursera", value: "coursera" },
  { label: "Disney+", value: "disney" },
  { label: "Google One", value: "google-one" },
  { label: "HBO Max", value: "hbo-max" },
  { label: "Microsoft", value: "microsoft" },
  { label: "Netflix", value: "netflix" },
  { label: "Spotify", value: "spotify" },
  { label: "Udemy", value: "udemy" },
  { label: "YouTube", value: "youtube" },
  { label: "Others", value: "other" },
];

const paymentMethodList = ["cash", "bank", "debit card", "credit card", "e-wallet", "qris"];

const FormSubscription = ({ openSubcription, setOpenSubcription, onClose, isLoadingSubcription, handleSubmitSubscription, dataEditSubcription }) => {
  const [open, setOpen] = useState(false);
  const [valueSubscription, setValueSubscription] = useState("");

  const [localErrors, setLocalErrors] = useState({});
  const [formSubcription, setFormSubcription] = useState({
    amount: "",
    interval: "",
    paymentMethod: "",
    date: "",
    subscription: "netflix",
  });

  const [date, setDate] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    const rawValue = value.replace(/\./g, "");

    setFormSubcription((prev) => ({
      ...prev,
      [name]: rawValue,
    }));
  };

  useEffect(() => {
    if (formSubcription.title === "other") {
      setOpenTitleSelect(true);
    }
  }, [formSubcription.title]);

  const handleLocalSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!valueSubscription) {
      errors.title = "Subscription title is required";
    }

    if (!formSubcription.amount || Number(formSubcription.amount) <= 0) {
      errors.amount = "Amount is required and must be greater than zero";
    }

    if (!formSubcription.interval) {
      errors.interval = "Interval is required";
    }

    setLocalErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const payload = {
      ...formSubcription,
      title: valueSubscription,
    };

    setLocalErrors({});
    handleSubmitSubscription(e, { ...payload, status: "active" }, dataEditSubcription ? "edit" : "add", dataEditSubcription && dataEditSubcription?._id);
  };

  const formatRupiah = (value) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if (dataEditSubcription) {
      setFormSubcription({
        title: dataEditSubcription?.title,
        amount: String(dataEditSubcription?.amount),
        interval: dataEditSubcription?.interval,
        paymentMethod: dataEditSubcription?.paymentMethod,
        date: dataEditSubcription?.edit,
      });

      setDate(dataEditSubcription?.date);
      setValueSubscription(dataEditSubcription?.title);
    }
  }, [dataEditSubcription]);

  return (
    <Dialog open={openSubcription} onOpenChange={setOpenSubcription}>
      <DialogContent className="md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Set Subcription</DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>
        {isLoadingSubcription ? (
          <Loading />
        ) : (
          <form className="space-y-5" onSubmit={handleLocalSubmit}>
            {/* AMOUNT */}
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="flex items-center gap-2">
                <p className="bg-accent p-1 rounded">Rp </p>
                <Input name="amount" type="text" value={formatRupiah(formSubcription.amount)} onChange={handleChange} placeholder="5.000.000" autoComplete="off" />
              </div>
              <Activity mode={localErrors.amount ? "visible" : "hidden"}>
                <p className=" text-sm mb-5 text-red-500">*{localErrors.amount}</p>
              </Activity>
            </div>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  {valueSubscription ? CATEGORIES.find((subs) => subs.value === valueSubscription)?.label : "Select Subscription..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search Subscription..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No Subscription found.</CommandEmpty>
                    <CommandGroup>
                      {CATEGORIES.map((subs) => (
                        <CommandItem
                          key={subs.value}
                          value={subs.value}
                          onSelect={(currentValue) => {
                            setValueSubscription(currentValue === valueSubscription ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          {subs.label}
                          <Check className={cn("ml-auto", valueSubscription === subs.value ? "opacity-100" : "opacity-0")} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Activity mode={localErrors.title ? "visible" : "hidden"}>
              <p className=" text-sm mb-5 text-red-500">*{localErrors.title}</p>
            </Activity>

            {/* DATE */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setFormSubcription((prev) => ({
                        ...prev,
                        date: d ? d.toISOString() : "",
                      }));
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* PAYMENT */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select key={formSubcription.paymentMethod} value={formSubcription.paymentMethod} onValueChange={(value) => setFormSubcription((prev) => ({ ...prev, paymentMethod: value }))}>
                <SelectTrigger className={`w-full`}>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethodList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Interval</Label>
              <Select key={formSubcription.interval} value={formSubcription.interval} onValueChange={(value) => setFormSubcription((prev) => ({ ...prev, interval: value }))}>
                <SelectTrigger className={`w-full`}>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Montly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Activity mode={localErrors.interval ? "visible" : "hidden"}>
                <p className=" text-sm mb-5 text-red-500">*{localErrors.interval}</p>
              </Activity>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className={`cursor-pointer`}>
                Cancel
              </Button>
              <Button type="submit" className={`cursor-pointer`}>
                {dataEditSubcription ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FormSubscription;
