import { Activity, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import useGetUserIdFromLocalStorage from "@/hooks/others/useGetUserIdFromLocalStorage ";
import { useDispatch } from "react-redux";
import useAddTransactions from "@/hooks/transactions/useAddTransactions";
import Loading from "@/features/others/Loading";
import { addTransactions } from "../addTransactions";
import { validateTransaction } from "@/utils/transactions/validateTransactions";
import useEditTransactions from "@/hooks/transactions/useEditTransactions";
import { editTransactions } from "../editTransactions";

const typeOptions = [
  { title: "Income", value: "income" },
  { title: "Expense", value: "expense" },
];

const categorieIncome = [
  { title: "Salary", value: "salary" },
  { title: "Bonus", value: "bonus" },
  { title: "Freelance", value: "freelance" },
  { title: "Business", value: "business" },
  { title: "Gift", value: "gift" },
  { title: "Others", value: "others" },
];

const categoriesExpense = [
  { title: "Essential", value: "essentials" },
  { title: "Lifestyle", value: "lifestyle" },
  { title: "Health", value: "health" },
  { title: "Family & Social", value: "family-social" },
  { title: "Financial", value: "financial" },
  { title: "Others", value: "others" },
];

const paymentMethodList = ["cash", "bank", "debit card", "credit card", "e-wallet", "qris"];

const FormTransactions = ({ onClose, dataEditTransactions }) => {
  const dispatch = useDispatch();
  const user_id = useGetUserIdFromLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "others",
    date: "",
    paymentMethod: "cash",
    description: "",
  });

  const [errorform, setErrorForm] = useState({
    isValid: false,
    errors: {
      title: "",
      amount: "",
    },
  });

  const [typeCategory, setTypeCategory] = useState(categorieIncome);
  const [date, setDate] = useState();

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  useEffect(() => {
    if (dataEditTransactions && dataEditTransactions.status === "edit")
      setForm({
        title: dataEditTransactions?.item?.title,
        amount: String(dataEditTransactions?.item?.amount),
        type: dataEditTransactions?.item?.type,
        category: dataEditTransactions?.item?.category,
        date: dataEditTransactions?.item?.date,
        paymentMethod: dataEditTransactions?.item?.paymentMethod,
        description: dataEditTransactions?.item?.description,
      });
  }, [dataEditTransactions]);

  const { isError: isErrorAddTransactions, error: errorAddTransactions, data: dataAddTranscations, mutate: mutateAddTransactions } = useAddTransactions({ handleLoading });
  const { isError: isErrorEditTransactions, error: errorEditTransactions, data: dataResultEditTranscations, mutate: mutateEditTransactions } = useEditTransactions({ handleLoading });

  // generic handler (input & textarea)
  const handleChange = (e) => {
    const { name, value } = e.target;

    const rawValue = value.replace(/\./g, ""); // hapus semua titik

    setForm((prev) => ({
      ...prev,
      [name]: rawValue,
    }));
  };

  // sync category by type
  useEffect(() => {
    if (form.type === "income") {
      setTypeCategory(categorieIncome);
      setForm((prev) => ({ ...prev, category: "others" }));
    } else {
      setTypeCategory(categoriesExpense);
      setForm((prev) => ({ ...prev, category: "others" }));
    }
  }, [form.type]);

  const formatRupiah = (value) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSubmitTransactions = (e) => {
    e.preventDefault();
    const { title, amount, type, category, date, paymentMethod, description } = form;

    const dataTransactions = {
      user_id,
      title,
      amount,
      type,
      category,
      date,
      paymentMethod,
      description,
    };

    const validationTransactions = validateTransaction({ title, amount });

    if (validationTransactions.isValid === false) return setErrorForm(validationTransactions);

    setErrorForm({
      isValid: false,
      errors: {
        title: "",
        amount: "",
      },
    });

    if (dataEditTransactions && dataEditTransactions.status === "edit") {
      mutateEditTransactions({ dataTransactions, idTransactions: dataEditTransactions.item._id });
    } else {
      mutateAddTransactions({ dataTransactions });
    }
  };

  // if success add transactions
  useEffect(() => {
    if (dataAddTranscations) dispatch(addTransactions({ status: true, message: "Transaction added successfully." }));
  }, [dataAddTranscations]);

  // if error add transactions
  useEffect(() => {
    if (errorAddTransactions) dispatch(addTransactions({ status: false, message: "Failed to add the transaction." }));
  }, [isErrorAddTransactions]);

  // if success edit transactions
  useEffect(() => {
    if (dataResultEditTranscations) dispatch(editTransactions({ status: true, message: "Transaction updated successfully." }));
  }, [dataResultEditTranscations]);

  // if error add transactions
  useEffect(() => {
    if (errorEditTransactions) dispatch(editTransactions({ status: false, message: "Failed to update transaction." }));
  }, [isErrorEditTransactions]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form className="space-y-5" onSubmit={handleSubmitTransactions}>
          {/* TITLE */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} placeholder="Monthly Salary" />
            <Activity mode={errorform.isValid === false && errorform.errors?.title ? "visible" : "hidden"}>
              <p className=" text-sm mb-5 text-red-500">*{errorform.errors?.title}</p>
            </Activity>
          </div>

          {/* AMOUNT */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="flex items-center gap-2">
              <p className="bg-accent p-1 rounded">Rp </p>
              <Input name="amount" type="text" value={formatRupiah(form.amount)} onChange={handleChange} placeholder="5.000.000" />
            </div>
            <Activity mode={errorform.isValid === false && errorform.errors?.amount ? "visible" : "hidden"}>
              <p className=" text-sm mb-5 text-red-500">*{errorform.errors?.amount}</p>
            </Activity>
          </div>

          {/* TYPE & CATEGORY */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 w-full">
              <Label>Type</Label>
              <Select key={form.type} value={form.type} onValueChange={(value) => setForm((prev) => ({ ...prev, type: value }))}>
                <SelectTrigger className={`w-full`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select key={form.category} value={form.category} onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}>
                <SelectTrigger className={`w-full`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeCategory.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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
                    setForm((prev) => ({
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
            <Select key={form.paymentMethod} value={form.paymentMethod} onValueChange={(value) => setForm((prev) => ({ ...prev, paymentMethod: value }))}>
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

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} placeholder="January salary" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className={`cursor-pointer`}>
              Cancel
            </Button>
            <Button type="submit" className={`cursor-pointer`}>
              {dataEditTransactions && dataEditTransactions.status === "edit" ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default FormTransactions;
