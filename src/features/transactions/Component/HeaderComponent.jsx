import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import useDebounce from "@/features/others/useDebounce";
import useParamsControllers from "@/hooks/others/useParamsControllers";
import useTransactionFilter from "@/hooks/transactions/useTransactionFilters";
import { ArrowDown, ArrowUp, LayoutGrid, Menu, Plus, Rows2 } from "lucide-react";
import { useEffect, useState } from "react";
import FormTransactions from "./FormTransactions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const type = [
  { title: "All", value: "all" },
  { title: "Income", value: "income" },
  { title: "Expense", value: "expense" },
];

const categorieIncome = [
  { title: "All", value: "all" },
  { title: "Salary", value: "salary" },
  { title: "Bonus", value: "bonus" },
  { title: "Freelance", value: "freelance" },
  { title: "Business", value: "business" },
  { title: "Gift", value: "gift" },
  { title: "Others", value: "others" },
];

const categoriesExpense = [
  { title: "All", value: "all" },
  { title: "Essential", value: "essentials" },
  { title: "Lifestyle", value: "lifestyle" },
  { title: "Health", value: "health" },
  { title: "Family & Social", value: "family & social" },
  { title: "Financial", value: "financial" },
  { title: "Others", value: "others" },
];

const HeaderComponent = () => {
  const { getParam, getAllParam, setManyParam } = useParamsControllers();
  const { setSearchInputParam, setFilterInputParam, setLayoutInputParam, setSortByParam } = useTransactionFilter();

  // search filter
  const searchParams = getParam("search") || "";
  const [searchInput, setSearchInput] = useState(searchParams);
  const debounceValue = useDebounce({ value: searchInput, delay: 1500 });

  // params
  const typeParam = getParam("type") ? decodeURIComponent(getParam("type")) : null;
  const categoryParam = getParam("category") ? decodeURIComponent(getParam("category")) : null;
  const sortByParam = decodeURIComponent(getParam("sortBy") || "latest");
  const layoutParam = decodeURIComponent(getParam("layout") || "grid");

  // filter tag
  const [filter, setFilter] = useState({
    type: typeParam ? typeParam : "all",
    category: categoryParam ? categoryParam : "all",
  });
  const [layout, setLayout] = useState(layoutParam);

  // sheet/sidebar
  const [open, setOpen] = useState(false);
  const [typeCategory, setTypeCategory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const current = getAllParam();
    setManyParam({
      ...current,
      page: 1,
      limit: 10,
    });
  }, [searchParams]);

  // set params after debounce input
  useEffect(() => {
    setSearchInputParam(debounceValue);
  }, [debounceValue]);

  // re-render when type changes
  useEffect(() => {
    if (filter.type === "income") {
      setTypeCategory(categorieIncome);
    } else if (filter.type === "expense") {
      setTypeCategory(categoriesExpense);
    } else {
      setTypeCategory([]);
      setFilter((prev) => ({ ...prev, category: "all" }));
    }
  }, [filter.type]);

  // click order by old ord new data
  const handleClickOrder = () => {
    setSortByParam(sortByParam);
  };

  // click layout ui
  const handleLayout = (value) => {
    setLayout(value);
    setLayoutInputParam(value);
  };

  // handle submit filter
  const handleSubmitFilter = (e) => {
    e.preventDefault();

    setFilterInputParam({ type: filter.type, category: filter.category });

    setOpen(false);
  };

  return (
    <div className="mt-20 mx-10">
      <div className="mx-auto lg:hidden">
        <Input placeholder="Search" className="placeholder:italic placeholder:opacity-80 ring-1" value={searchInput} onInput={(e) => setSearchInput(e.target.value)} />
      </div>

      <div className="mt-10 flex justify-between">
        <div className="flex items-center gap-5 lg:gap-0 cursor-pointer">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <div className="hover:bg-primary p-1 rounded lg:hidden">
                <Menu />
              </div>
            </SheetTrigger>

            <SheetContent side="left" className="bg-sidebar">
              <SheetHeader>
                <SheetTitle>Set filtering transactions</SheetTitle>
                <SheetDescription />

                <form onSubmit={handleSubmitFilter}>
                  <div className="mt-10">
                    {/* TYPE */}
                    <RadioGroup value={filter.type} onValueChange={(value) => setFilter((prev) => ({ ...prev, type: value }))}>
                      <h1 className="mb-5 font-bold">TAG</h1>
                      {type.map((t) => (
                        <div key={t.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={t.value} id={t.title} />
                          <Label htmlFor={t.title}>{t.title}</Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {/* CATEGORY */}
                    {typeCategory.length > 0 && (
                      <RadioGroup className="mt-10" value={filter.category} onValueChange={(value) => setFilter((prev) => ({ ...prev, category: value }))}>
                        <h1 className="mb-5 font-bold text-xl">Category</h1>
                        {typeCategory.map((c) => (
                          <div key={c.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={c.value} id={c.title} />
                            <Label htmlFor={c.title}>{c.title}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>

                  <Button className="mt-10 w-full">Search</Button>
                </form>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <Plus /> ADD
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="border-b pb-1">Transactions</DialogTitle>
              </DialogHeader>
              <DialogDescription></DialogDescription>

              <FormTransactions onClose={() => setOpenDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex w-96 mr-5">
            <Input placeholder="Search" className="placeholder:italic placeholder:opacity-80 ring-1" value={searchInput} onInput={(e) => setSearchInput(e.target.value)} />
          </div>

          <div className="flex gap-1 bg-accent p-1 rounded items-center">
            <div className={`p-1 cursor-pointer ${layout === "grid" && "bg-primary rounded"}`} onClick={() => handleLayout("grid")}>
              <LayoutGrid />
            </div>
            <div className={`p-1 cursor-pointer ${layout === "list" && "bg-primary rounded"}`} onClick={() => handleLayout("list")}>
              <Rows2 />
            </div>
          </div>

          <div className="bg-primary p-2 rounded cursor-pointer" onClick={handleClickOrder}>
            {sortByParam === "oldest" ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
