import Avatar from "boring-avatars";
import {
  BriefcaseBusiness,
  Calendar,
  EllipsisVertical,
  Map,
  MapPin,
  MessageSquareText,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const [user, setUser] = useState({
    name: "مهدی مفیدی فر",
    phone: "09356279099",
    email: "mahdi2008.mofidifar@gmail.com",
  });
  const uniqueIdentifier = user?.email || user?.phone || "guest";
  return (
    <div className="">
      <div
        className="head relative p-3 bg-brand-700 w-full h-50 rounded-b-2xl rounded-t-md
      "
      >
        <div className="‍‍">
          <EllipsisVertical className="text-slate-200 absolute top-4 left-4" />
        </div>
        <div
          className="info flex items-center gap-3
        "
        >
          <Avatar
            className="rounded-full border-2 border-s-emerald-50"
            size={90}
            name={uniqueIdentifier}
            variant="beam" // گزینه‌ها: "marble", "beam", "pixel", "sunset", "bauhaus", "ring"
            colors={["#0a2540", "#635bff", "#00d4b2", "#2e1065", "#f59e0b"]}
          />
          <div className="text-slate-200 flex flex-col gap-3 text-lg">
            <div className="name">{user.name} </div>
            <div className="number">{user.phone}</div>
          </div>
        </div>
      </div>
      <div className="hero p-3 w-full flex flex-col justify-center items-start">
        <Link to="#" className=" w-full py-3 flex items-center gap-3 border-b ">
          <BriefcaseBusiness />
          <span>کسب‌وکار های من</span>
        </Link>
        <Link to="#" className=" w-full py-3 flex items-center gap-3 border-b ">
          <Trophy />
          <span>دستاورد های من</span>
        </Link>
        <Link to="#" className=" w-full py-3 flex items-center gap-3 border-b ">
          <MessageSquareText />
          <span>نظرات های من</span>
        </Link>
        <Link to="#" className=" w-full py-3 flex items-center gap-3 border-b ">
          <MapPin />
          <span>تنظیم محله</span>
        </Link>
        <Link to="#" className=" w-full py-3 flex items-center gap-3 border-b ">
          <Calendar />
          <span>رزرو های من</span>
        </Link>
      </div>
    </div>
  );
}
