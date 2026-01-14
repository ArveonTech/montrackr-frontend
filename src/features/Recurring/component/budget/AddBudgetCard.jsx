import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddBudgetCard = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-muted-foreground/30 p-10 text-center h-full">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Plus className="h-6 w-6 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium">No budget yet</p>
        <p className="text-xs text-muted-foreground">Create your monthly budget to start tracking expenses</p>
      </div>

      <Button onClick={onClick} className={`cursor-pointer`}>+ Add Budget</Button>
    </div>
  );
};

export default AddBudgetCard;
