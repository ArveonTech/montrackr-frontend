import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useUpdateProfileField from "@/hooks/profile/useUpdateProfileField";

const avatars = ["profile-1", "profile-2", "profile-3", "profile-4", "profile-5", "profile-6"];

const EditAvatarDialog = ({ open, onOpenChange, accessToken }) => {
  const [selected, setSelected] = useState(avatars[0]);
  const [dialogLoading, setDialogLoading] = useState(false);
  const { mutate: updateProfile, isLoading } = useUpdateProfileField({ handleLoading: setDialogLoading });

  const onSave = () => {
    updateProfile({ fieldUser: "profile", value: selected, accessToken });
    // wait for mutation to finish to close
  };

  const wasLoadingRef = useRef(false);
  useEffect(() => {
    if (wasLoadingRef.current && !isLoading) {
      onOpenChange(false);
    }
    wasLoadingRef.current = isLoading;
  }, [isLoading]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change avatar</DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>
        <div className="grid grid-cols-3  my-4">
          {avatars.map((a) => (
            <button key={a} type="button" onClick={() => setSelected(a)} className={`rounded-full w-fit mx-auto p-5 border ${selected === a ? "border-primary" : "border-transparent"}`}>
              <img src={`/profile/${a.replace("profile-", "")}.png`} alt={a} className="w-16 h-16 object-cover rounded-full mx-auto" />
            </button>
          ))}
        </div>

        {(dialogLoading || isLoading) && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Spinner className="w-5 h-5" />
              <span className="text-sm">Saving...</span>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAvatarDialog;
