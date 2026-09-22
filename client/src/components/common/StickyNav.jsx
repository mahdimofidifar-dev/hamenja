import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Navigation } from "lucide-react";
import PhoneDialog from "../forms/PhoneDialog";

const StickyNav = ({ latitude, longitude, phone, mobile }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  return (
    <nav className="sticky flex items-center gap-5 p-3 bottom-0 right-0 h-20 w-full backdrop-blur-2xl z-50 ">
      <PhoneDialog mobile={mobile} phone={phone} />
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-lg mx-auto justify-center h-14 bg-brand-600 hover:bg-brand-500 text-white  rounded-lg flex items-center gap-1.5  cursor-pointer"
      >
        <Navigation className="size-5.5" />
        <span>مسیریابی</span>
      </a>
    </nav>
  );
};
export default StickyNav;
