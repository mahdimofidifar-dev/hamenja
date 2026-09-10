import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Navigation } from "lucide-react";

const StickyNav = ({ latitude, longitude, phone }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <nav className="sticky flex items-center  bottom-0 right-0 h-20 w-full b backdrop-blur-2xl z-50 ">
      <Dialog>
        <DialogTrigger showCloseButton={false} asChild>
          <Button
            variant="outline"
            className="h-14 w-full px-10 bg-brand-600 text-brand-200 text-lg rounded-lg cursor-pointer"
          >
            تماس
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle className="text-lg">تماس با فروشنده</DialogTitle>
          </DialogHeader>
          <a
            className="bg-brand-500 w-full text-center rounded-lg p-3 px-4"
            href={`tel:${phone}`}
          >
            تماس
          </a>
        </DialogContent>
      </Dialog>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-lg mx-auto justify-center h-14 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-lg flex items-center gap-1.5  cursor-pointer"
      >
        <Navigation className="" />
        <span>مسیریابی</span>
      </a>
    </nav>
  );
};
export default StickyNav;
