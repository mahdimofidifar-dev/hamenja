import { LogOutIcon, SettingsIcon, EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/authContext";

export function DropdownMenuProfile() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };
  const { logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <EllipsisVertical
            variant="outline"
            className="text-slate-200 cursor-pointer absolute top-4 left-4"
          />
        }
      />
      <DropdownMenuContent className="bg-brand-200 shadow-blue-950">
        {/* <DropdownMenuItem>
          <SettingsIcon />
          تنظیمات
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={logoutHandler} variant="destructive">
          <LogOutIcon />
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
