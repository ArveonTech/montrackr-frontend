import { LogOut, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileImages = {
  "profile-1": "/profile/1.png",
  "profile-2": "/profile/2.png",
  "profile-3": "/profile/3.png",
  "profile-4": "/profile/4.png",
  "profile-5": "/profile/5.png",
  "profile-6": "/profile/6.png",
};

const ProfileComponent = ({ dataProfile, onEditAvatar, onEditUsername }) => {
  return (
    <div className="w-full bg-card rounded-xl p-4 flex items-center gap-4 shadow-sm mx-auto mt-20 overflow-hidden">
      <div className="relative shrink-0">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profileImages[dataProfile?.data?.profile]} />
          <AvatarFallback>profile-image</AvatarFallback>
        </Avatar>
        <Pencil onClick={onEditAvatar} className="absolute bottom-0 right-0 z-10 cursor-pointer" />
      </div>

      <div className="flex w-full min-w-0 items-center justify-between">
        <div className="space-y-2 min-w-0">
          <div className="flex gap-2 items-center min-w-0">
            <h1 className="text-sm font-semibold text-[#0f5e5a] truncate">{dataProfile?.data?.username}</h1>
            <Pencil size={14} onClick={onEditUsername} className="cursor-pointer shrink-0" />
          </div>

          <div className="text-xs text-[#3b766f] truncate">{dataProfile?.data?.email}</div>
        </div>

        <button aria-label="edit-profile" className="p-2 rounded-lg bg-white/60 hover:bg-white text-[#0f5e5a] shadow-sm shrink-0 cursor-pointer" type="button">
          <LogOut />
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
