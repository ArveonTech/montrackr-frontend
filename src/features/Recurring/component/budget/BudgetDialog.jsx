import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const CATEGORIES = [
  { id: "Essential", label: "essentials" },
  { id: "Lifestyle", label: "lifestyle" },
  { id: "Health", label: "health" },
  { id: "Family & Social", label: "family-social" },
  { id: "Financial", label: "financial" },
  { id: "Others", label: "others" },
];

const BudgetDialog = ({ openBudget, setOpenBudget, onClose }) => {
  const [formatBudget, setFormatBudget] = useState({
    essentials: "",
    lifestyle: "",
    health: "",
    "family & social": "",
    financial: "",
    others: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.info("name", name);
    console.info("value", value);

    const rawValue = value.replace(/\./g, ""); // hapus semua titik

    setFormatBudget((prev) => ({
      ...prev,
      [name]: rawValue,
    }));
  };

  const formatRupiah = (value) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Dialog open={openBudget} onOpenChange={setOpenBudget}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Set Monthly Budget</DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>
        <div className="space-y-6">
          {/* Total Budget */}
          <div className="space-y-2">
            <Label>Total Monthly Budget</Label>
            <Input placeholder="5.000.000" />
          </div>

          {/* Budget per Category */}
          <div className="space-y-4">
            <p className="text-sm font-medium">Budget per Category</p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              {CATEGORIES.map((category) => (
                <div key={category.id} className="space-y-2">
                  <Label className="w-28 text-sm text-muted-foreground">{category.label}</Label>
                  <Input name={formatBudget[category.label]} value={formatRupiah(formatBudget[category.label])} placeholder="0" className={`placeholder:opacity-80`} onChange={handleChange} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Save Budget</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetDialog;
