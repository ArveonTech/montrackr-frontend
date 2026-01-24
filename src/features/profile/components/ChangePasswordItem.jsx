import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import useChangePassword from "@/hooks/profile/useChangePassword";
import { Ellipsis, Eye, EyeOff } from "lucide-react";
import validator from "validator";
import { Spinner } from "@/components/ui/spinner";

const ChangePasswordItem = ({ accessToken, profileData }) => {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [dialogLoading, setDialogLoading] = useState(false);
  const { mutate: changePassword, isLoading } = useChangePassword({ handleLoading: setDialogLoading });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    if (!newPassword) return setErrorPassword("Password is required!");
    if (
      !validator.isStrongPassword(newPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      return setErrorPassword("Password must be at least 8 chars, contain uppercase & numbers!");
    }

    setErrorPassword("");

    const dataUser = {
      _id: profileData?._id || profileData?.data?._id,
      username: profileData?.data?.username,
      email: profileData?.data?.email,
      profile: profileData?.data?.profile,
      newPassword,
    };

    changePassword({ dataUser, accessToken });
  };

  // close dialog when mutation transitions from loading -> not loading
  const wasLoadingRef = useRef(false);
  useEffect(() => {
    if (wasLoadingRef.current && !isLoading) {
      setOpen(false);
    }
    wasLoadingRef.current = isLoading;
  }, [isLoading]);

  return (
    <div className="bg-card rounded-md border p-3 shadow">
      <div className="flex items-center justify-between">
        <div className="text-sm">Change Password</div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className={`cursor-pointer flex items-center`} size="sm">
              <span>
                <Ellipsis />
              </span>
              Change
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>

            <DialogDescription></DialogDescription>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New password"
                required
                className={`placeholder:opacity-70`}
                autoComplete="current-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {showPassword ? (
                <Eye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
            {errorPassword ? <p className="text-xs text-red-500 italic">*{errorPassword}</p> : null}

            {(dialogLoading || isLoading) && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Spinner className="w-5 h-5" />
                  <span className="text-sm">Saving...</span>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChangePasswordItem;
