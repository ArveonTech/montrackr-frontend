import ProfileComponent from "@/features/profile/components/ProfileComponent";
import useGetProfile from "@/hooks/profile/useGetProfile";
import { useEffect, useState } from "react";
import EditAvatarDialog from "@/features/profile/components/EditAvatarDialog";
import EditUsernameDialog from "@/features/profile/components/EditUsernameDialog";
import ChangePasswordItem from "@/features/profile/components/ChangePasswordItem";
import ExportItem from "@/features/profile/components/ExportItem";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import useLogout from "@/hooks/profile/useLogout";
import { changeProfile } from "@/features/profile/changeProfileSlice";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const ProfilePage = () => {
  const statusChangeProfile = useSelector((state) => state.changeProfile);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access-token");
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openUsername, setOpenUsername] = useState(false);
  const [loadingLogout, setloadingLogout] = useState(false);

  const handleLoading = (value) => {
    setloadingLogout(value);
  };

  const { data: dataGetProfile } = useGetProfile({ accessToken });
  const { mutate: mutateLogout } = useLogout({ handleLoading });

  useEffect(() => {
    if (statusChangeProfile && statusChangeProfile.status) {
      if (statusChangeProfile.status === "success") {
        toast.success(statusChangeProfile.message || "Update profile success");
      } else {
        toast.error(statusChangeProfile.message || "Update profile failed");
      }

      dispatch(changeProfile({ status: "", message: "" }));
    }
  }, [statusChangeProfile]);

  return (
    <div className="space-y-10 px-10 max-w-200 min-w-100 mx-auto">
      <section className="mx-auto w-full">
        <ProfileComponent dataProfile={dataGetProfile} onEditAvatar={() => setOpenAvatar(true)} onEditUsername={() => setOpenUsername(true)} mutateLogout={mutateLogout} loadingLogout={loadingLogout} />
      </section>

      <EditAvatarDialog open={openAvatar} onOpenChange={setOpenAvatar} accessToken={accessToken} dataProfile={dataGetProfile} />
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
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-10">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="bg-primary p-3 rounded-full hover:bg-primary/70 cursor-pointer animate-bounce">
            <Home size={28} />
          </Link>

          <h1 className="text-center">
            Made by{" "}
            <a href="https://www.linkedin.com/in/ahdarizqi/" className="text-cyan-500">
              Ar
            </a>
          </h1>

          <span className="w-7" />
        </div>
      </footer>

      <Toaster position="top-center" richColors />
    </div>
  );
};

export default ProfilePage;
