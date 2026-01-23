import ProfileComponent from "@/features/profile/components/ProfileComponent";
import useGetProfile from "@/hooks/profile/useGetProfile";
import { useEffect, useState } from "react";
import EditAvatarDialog from "@/features/profile/components/EditAvatarDialog";
import EditUsernameDialog from "@/features/profile/components/EditUsernameDialog";
import ChangePasswordItem from "@/features/profile/components/ChangePasswordItem";
import ExportItem from "@/features/profile/components/ExportItem";
import { useSelector } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const ProfilePage = () => {
  const statusChangeProfile = useSelector((state) => state.changeProfile);
  const accessToken = localStorage.getItem("access-token");
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openUsername, setOpenUsername] = useState(false);

  const { data: dataGetProfile } = useGetProfile({ accessToken });

  useEffect(() => {
    if (statusChangeProfile && statusChangeProfile.status) {
      if (statusChangeProfile.status === "success") {
        toast.success(statusChangeProfile.message || "Update profile success");
      } else {
        toast.error(statusChangeProfile.message || "Update profile failed");
      }
    }
  }, [statusChangeProfile]);

  return (
    <div className="space-y-10 px-10 max-w-200 min-w-100 mx-auto">
      <section className="mx-auto w-full">
        <ProfileComponent dataProfile={dataGetProfile} onEditAvatar={() => setOpenAvatar(true)} onEditUsername={() => setOpenUsername(true)} />
      </section>

      <EditAvatarDialog open={openAvatar} onOpenChange={setOpenAvatar} accessToken={accessToken} />
      <EditUsernameDialog open={openUsername} onOpenChange={setOpenUsername} accessToken={accessToken} defaultUsername={dataGetProfile?.data?.username} />

      <section className="w-full">
        <div className="w-full mx-auto mt-6">
          <div className="mb-2 font-semibold text-sm text-[#0f5e5a]">Account</div>
          <hr className="mb-3" />
          <ChangePasswordItem accessToken={accessToken} profileData={dataGetProfile} />
        </div>
      </section>

      <section>
        <div className="w-full mx-auto mt-6">
          <div className="mb-2 font-semibold text-sm text-[#0f5e5a]">Others</div>
          <hr className="mb-3" />
          <ExportItem accessToken={accessToken} />
        </div>
      </section>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default ProfilePage;
