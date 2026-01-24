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

const HeaderComponent = ({ typeParam, categoryParam }) => {
  const { getParam, getAllParam, setManyParam } = useParamsControllers();
  const { setSearchInputParam, setFilterInputParam, setLayoutInputParam, setSortByParam } = useTransactionFilter();

  // ===== PARAMS =====
  const searchParam = getParam("search") || "";
  const sortByParam = decodeURIComponent(getParam("sortBy") || "latest");
  const layoutParam = decodeURIComponent(getParam("layout") || "grid");

  // ===== SEARCH =====
  const [searchInput, setSearchInput] = useState(searchParam);
  const debounceValue = useDebounce({ value: searchInput, delay: 1500 });

  // ===== TEMP FILTER (ONLY FOR SHEET) =====
  const [draftFilter, setDraftFilter] = useState({
    type: typeParam,
    category: categoryParam,
  });

  // ===== CATEGORY =====
  const typeCategory = draftFilter.type === "income" ? categorieIncome : draftFilter.type === "expense" ? categoriesExpense : [];

  // ===== UI STATE =====
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // ===== EFFECT =====
  useEffect(() => {
    setSearchInputParam(debounceValue);
  }, [debounceValue]);

  useEffect(() => {
    const current = getAllParam();
    setManyParam({ ...current, page: 1, limit: 10 });
  }, [searchParam]);

  // ===== HANDLER =====
  const handleSubmitFilter = (e) => {
    e.preventDefault();

    // APPLY KE PARAMS DI SINI 🔥
    setFilterInputParam({
      type: draftFilter.type,
      category: draftFilter.category,
    });

    setOpen(false);
  };

  return (
    <header className="mt-20 mx-10">
      {/* MOBILE SEARCH */}
      <div className="mx-auto lg:hidden">
        <Input placeholder="Search" value={searchInput} onInput={(e) => setSearchInput(e.target.value)} />
      </div>

      <div className="mt-10 flex justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-5">
          {/* FILTER MOBILE */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <div className="hover:bg-primary p-1 rounded lg:hidden">
                <Menu />
              </div>
            </SheetTrigger>

            <SheetContent side="left" className="bg-sidebar">
              <SheetHeader>
                <SheetTitle>Set filtering transactions</SheetTitle>

                <form onSubmit={handleSubmitFilter}>
                  <div className="mt-10">
                    {/* TYPE */}
                    <RadioGroup
                      value={draftFilter.type}
                      onValueChange={(value) =>
                        setDraftFilter({
                          type: value,
                          category: "all",
                        })
                      }
                    >
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
                      <RadioGroup
                        className="mt-10"
                        value={draftFilter.category}
                        onValueChange={(value) =>
                          setDraftFilter((prev) => ({
                            ...prev,
                            category: value,
                          }))
                        }
                      >
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
              <SheetDescription></SheetDescription>
            </SheetContent>
          </Sheet>

          {/* ADD */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus /> ADD
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="border-b pb-1">Transactions</DialogTitle>
              </DialogHeader>

              <FormTransactions onClose={() => setOpenDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* DESKTOP SEARCH */}
          <div className="hidden lg:flex w-96 mr-5">
            <Input placeholder="Search" value={searchInput} onInput={(e) => setSearchInput(e.target.value)} />
          </div>

          {/* LAYOUT (INSTANT OK) */}
          <div className="flex gap-1 bg-accent p-1 rounded items-center">
            <div className={`p-1 cursor-pointer ${layoutParam === "grid" && "bg-primary rounded"}`} onClick={() => setLayoutInputParam("grid")}>
              <LayoutGrid />
            </div>
            <div className={`p-1 cursor-pointer ${layoutParam === "list" && "bg-primary rounded"}`} onClick={() => setLayoutInputParam("list")}>
              <Rows2 />
            </div>
          </div>

          {/* SORT */}
          <div className="bg-primary p-2 rounded cursor-pointer" onClick={() => setSortByParam(sortByParam)}>
            {sortByParam === "oldest" ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
