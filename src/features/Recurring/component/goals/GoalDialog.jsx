import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, useEffect, useState } from "react";
import Loading from "@/features/others/Loading";

const GoalDialog = ({ openGoal, setOpenGoal, onClose, isLoadingGoal, handleSubmitGoal, errorFormGoal, dataEditGoal }) => {
  const [title, setTitle] = useState("");
  const [targetGoal, setTargetGoal] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");

  const formatRupiah = (value) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChangeTarget = (e) => {
    const raw = e.target.value.replace(/\./g, "");
    setTargetGoal(raw);
  };

  const handleChangeCurrent = (e) => {
    const raw = e.target.value.replace(/\./g, "");
    setCurrentBalance(raw);
  };

  useEffect(() => {
    if (dataEditGoal && dataEditGoal.data && dataEditGoal.data.items) {
      const goal = dataEditGoal.data.items;
      setTitle(goal.title || "");
      setTargetGoal(goal.targetGoal ? goal.targetGoal.toString() : "");
      setCurrentBalance(goal.currentBalance ? goal.currentBalance.toString() : "");
    }
  }, [dataEditGoal]);

  return (
    <Dialog open={openGoal} onOpenChange={setOpenGoal}>
      <DialogContent className="md:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dataEditGoal ? "Edit Goal" : "Create Goal"}</DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>
        {isLoadingGoal ? (
          <Loading />
        ) : (
          <form onSubmit={(e) => handleSubmitGoal(e, { title, targetGoal, currentBalance }, dataEditGoal ? "edit" : "add")}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="My Trip" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Activity mode={!errorFormGoal.isValidate && errorFormGoal.title ? "visible" : "hidden"}>
                  <p className="text-sm mt-1 text-red-500">{errorFormGoal.title}</p>
                </Activity>
              </div>

              <div className="space-y-2">
                <Label>Target Goal</Label>
                <div className="flex items-center gap-2">
                  <p className="bg-accent p-1 rounded">Rp </p>
                  <Input placeholder="5.000.000" value={formatRupiah(targetGoal)} onChange={handleChangeTarget} />
                </div>
                <Activity mode={!errorFormGoal.isValidate && errorFormGoal.targetGoal ? "visible" : "hidden"}>
                  <p className="text-sm mt-1 text-red-500">{errorFormGoal.targetGoal}</p>
                </Activity>
              </div>

              <div className="space-y-2">
                <Label>Current Balance</Label>
                <div className="flex items-center gap-2">
                  <p className="bg-accent p-1 rounded">Rp </p>
                  <Input placeholder="0" value={formatRupiah(currentBalance)} onChange={handleChangeCurrent} />
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" className={`cursor-pointer`}>
                Save Goal
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GoalDialog;
