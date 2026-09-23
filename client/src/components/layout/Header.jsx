import { useAuth } from "@/context/authContext";
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
import logo from "@/assets/logo/hamenja-symbol.svg";

const Header = ({ ShowAddVendorBtn = true }) => {
  const { isLoggedIn, loading } = useAuth();

  return (
    <header className="flex justify-between items-center border-b  border-slate-200 px-4 h-14">
      <Sheet>
        <SheetTrigger>
          <Menu className="size-7" />
        </SheetTrigger>
        <SheetContent side="right" className="">
          <SheetHeader className="flex items-center flex-row-reverse justify-around">
            <SheetClose className="size-10 flex justify-center items-center">
              <X />
            </SheetClose>
            <SheetTitle>menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Link to="/" className="logo ">
        {/* <img src="@/assets/logo/hamenja-symbol.svg" alt="" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 700 180"
          width="150"
          height="100"
        >
          <defs>
            <linearGradient
              id="pinGradient"
              x1="25"
              y1="10"
              x2="150"
              y2="140"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#1677F2" />
              <stop offset="1" stop-color="#0B3D91" />
            </linearGradient>

            <linearGradient
              id="pathGradient"
              x1="40"
              y1="130"
              x2="150"
              y2="165"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#7FE7D6" />
              <stop offset="1" stop-color="#22C8B8" />
            </linearGradient>
          </defs>

          <g transform="translate(0 0)">
            <path
              d="
        M90 15
        C51 15 25 44 25 80
        C25 126 67 151 90 178
        C113 151 155 126 155 80
        C155 44 129 15 90 15
        Z
      "
              fill="url(#pinGradient)"
            />

            <circle cx="90" cy="78" r="24" fill="#FFFFFF" />

            <path
              d="
        M38 145
        C57 130 78 128 98 133
        C116 137 130 146 143 157
        L108 190
        C96 201 76 201 64 190
        L38 166
        C30 159 31 151 38 145
        Z
      "
              fill="url(#pathGradient)"
            />
          </g>

          <text
            x="200"
            y="115"
            direction="rtl"
            text-anchor="end"
            font-family="Vazirmatn, Tahoma, sans-serif"
            font-size="92"
            font-weight="800"
            fill="#0B3D91"
          >
            همینجا
          </text>
        </svg>
      </Link>
      <div className="flex items-center gap-6">
        {ShowAddVendorBtn && (
          <Link to="/add-business">
            <Store className="size-7" />
          </Link>
        )}
        {!loading && isLoggedIn ? (
          <Link to="/profile">
            <UserRound className="size-7" />
          </Link>
        ) : (
          <Link to="/auth">
            <LogIn className="size-7" />
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
