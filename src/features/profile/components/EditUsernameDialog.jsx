import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useUpdateProfileField from "@/hooks/profile/useUpdateProfileField";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { Spinner } from "@/components/ui/spinner";

const EditUsernameDialog = ({ open, onOpenChange, accessToken, defaultUsername = "" }) => {
  const [username, setUsername] = useState(defaultUsername);
  const [dialogLoading, setDialogLoading] = useState(false);
  const { mutate: updateProfile, isLoading } = useUpdateProfileField({ handleLoading: setDialogLoading });

  const onSave = () => {
    if (!username) return;
    updateProfile({ fieldUser: "username", value: username, accessToken });
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
          <DialogTitle className={`text-lg sm:text-2xl text-center`}>Change New Username</DialogTitle>
          <DialogDescription>
            <Input className={`mt-5 text-foreground`} id="username" type="text" placeholder="Enter new username" name="username" required autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} />
          </DialogDescription>
          {(dialogLoading || isLoading) && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Spinner className="w-5 h-5" />
                <span className="text-sm">Saving...</span>
              </div>
            </div>
          )}
          <DialogClose>
            <div className={"bg-primary mt-5 text-primary-foreground rounded text-center py-1 text-lg"} onClick={() => onSave()}>
              Save
            </div>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditUsernameDialog;
