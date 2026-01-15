import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, useEffect, useState } from "react";
import Loading from "@/features/others/Loading";

const ContributeGoalDialog = ({ openContribute, setOpenContribute, onClose, isLoadingContribute, handleSubmitContribute, errorFormContribute }) => {
  const [amount, setAmount] = useState("");

  const formatRupiah = (value) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChangeAmount = (e) => {
    const raw = e.target.value.replace(/\./g, "");
    setAmount(raw);
  };

  useEffect(() => {
    if (!openContribute) setAmount("");
  }, [openContribute]);

  return (
    <Dialog open={openContribute} onOpenChange={setOpenContribute}>
      <DialogContent className="md:max-w-md">
        <DialogHeader>
          <DialogTitle>Contribute to Goal</DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>
        {isLoadingContribute ? (
          <Loading />
        ) : (
          <form onSubmit={(e) => handleSubmitContribute(e, amount)}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="flex items-center gap-2">
                  <p className="bg-accent p-1 rounded">Rp </p>
                  <Input placeholder="100.000" value={formatRupiah(amount)} onChange={handleChangeAmount} />
                </div>
                <Activity mode={!errorFormContribute.isValidate && errorFormContribute.amount ? "visible" : "hidden"}>
                  <p className="text-sm mt-1 text-red-500">{errorFormContribute.amount}</p>
                </Activity>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" className={`cursor-pointer`}>
                Contribute
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContributeGoalDialog;
