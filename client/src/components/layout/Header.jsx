import { useAuth } from "@/context/isLogin";
import { Menu, UserRound, Store, LogIn, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
const Header = ({ ShowAddVendorBtn = true }) => {
  const { isLoggedIn } = useAuth();
  return (
    <header className="flex justify-between items-center border-b  border-slate-100 px-4 h-14">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="right" className="">
          <SheetHeader className="flex items-center flex-row-reverse justify-around">
            <SheetClose className="size-10 flex justify-center items-center">
              <X />{" "}
            </SheetClose>
            <SheetTitle>menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Link to="/" className="logo">
        booking platform
      </Link>
      <div className="flex items-center gap-2">
        {ShowAddVendorBtn && (
          <Link to="/addvendor">
            <Store />
          </Link>
        )}

        {isLoggedIn === true ? (
          <Link to="/profile">
            <UserRound />
          </Link>
        ) : (
          <Link to="/auth">
            <LogIn />
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
