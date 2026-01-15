import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, useEffect, useState } from "react";
import Loading from "@/features/others/Loading";

const CATEGORIES = [
  { id: "Essential", label: "essentials", value: "essentials" },
  { id: "Lifestyle", label: "lifestyle", value: "lifestyle" },
  { id: "Health", label: "health", value: "health" },
  { id: "Family & Social", label: "family-social", value: "family & social" },
  { id: "Financial", label: "financial", value: "financial" },
  { id: "Others", label: "others", value: "others" },
];

const BudgetDialog = ({ openBudget, setOpenBudget, onClose, isLoadingBudget, handleSubmitBudget, errorFormBudget, dataEditBudget }) => {
  const [totalBudget, setTotalBudget] = useState("");
  const [formBudget, setFormBudget] = useState({
    essentials: "",
    lifestyle: "",
    health: "",
    "family & social": "",
    financial: "",
    others: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const rawValue = value.replace(/\./g, "");

    setFormBudget((prev) => ({
      ...prev,
      [name]: rawValue,
    }));
  };

  const formatRupiah = (value) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChangeTotalBudget = (e) => {
    const { value } = e.target;
    const rawValue = value.replace(/\./g, "");
    setTotalBudget(rawValue);
  };

  useEffect(() => {
    if (dataEditBudget && dataEditBudget.data && dataEditBudget.data.resultGetBudget && dataEditBudget.data.amountExpenseMonth) {
      const categoriesBudget = dataEditBudget.data.resultGetBudget.categories;
      const budgetData = dataEditBudget.data.resultGetBudget;
      setTotalBudget(budgetData.budget.toString());

      setFormBudget({
        essentials: categoriesBudget.essentials.toString(),
        lifestyle: categoriesBudget.lifestyle.toString(),
        health: categoriesBudget.health.toString(),
        "family & social": categoriesBudget["family & social"].toString(),
        financial: categoriesBudget.financial.toString(),
        others: categoriesBudget.others.toString(),
      });
    }
  }, [dataEditBudget]);

  return (
    <Dialog open={openBudget} onOpenChange={setOpenBudget}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Set Monthly Budget</DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>
        {isLoadingBudget ? (
          <Loading />
        ) : (
          <form onSubmit={(e) => handleSubmitBudget(e, totalBudget, formBudget, dataEditBudget ? "edit" : "add")}>
            <div className="space-y-6">
              {/* Total Budget */}
              <div className="space-y-2">
                <Label>Total Monthly Budget</Label>
                <div className="flex items-center gap-2">
                  <p className="bg-accent p-1 rounded">Rp </p>
                  <Input placeholder="5.000.000" value={formatRupiah(totalBudget)} onChange={handleChangeTotalBudget} />
                </div>
                <Activity mode={!errorFormBudget.isValidate && errorFormBudget.budget ? "visible" : "hidden"}>
                  <p className="text-sm mt-1 text-red-500">{errorFormBudget.budget}</p>
                </Activity>
              </div>

              {/* Budget per Category */}
              <div className="space-y-4">
                <p className="text-sm font-medium">Budget per Category</p>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  {CATEGORIES.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <Label className="w-28 text-sm text-muted-foreground">{category.label}</Label>
                      <div className="flex items-center gap-2">
                        <p className="bg-accent p-1 rounded">Rp </p>
                        <Input name={category.value} value={formatRupiah(formBudget[category.value])} placeholder="0" className={`placeholder:opacity-80`} onChange={handleChange} />
                      </div>
                      <Activity mode={!errorFormBudget.isValidate && errorFormBudget.categories[category.value] ? "visible" : "hidden"}>
                        <p className="text-sm mt-1 text-red-500">{errorFormBudget.categories[category.value]}</p>
                      </Activity>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" className={`cursor-pointer`}>
                Save Budget
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BudgetDialog;
