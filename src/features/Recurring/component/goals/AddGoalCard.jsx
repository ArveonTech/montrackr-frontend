import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddGoalCard = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-muted-foreground/30 p-10 text-center h-full">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Plus className="h-6 w-6 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium">No goal yet</p>
        <p className="text-xs text-muted-foreground">Create a goal to start saving towards it</p>
      </div>

      <Button onClick={onClick} className={`cursor-pointer`}>
        + Add Goal
      </Button>
    </div>
  );
};

export default AddGoalCard;
