import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Phone } from "lucide-react";
const PhoneDialog = ({ contentButton = "تماس", mobile, phone }) => {
  return (
    <Dialog className="w-full">
      <DialogTrigger>
        <a className="w-full h-14 gap-1.5 px-10 py-4 flex items-center justify-center text-lg bg-brand-600 hover:bg-brand-500 text-white rounded-md cursor-pointer">
          <Phone className="size-5.5" />
          {contentButton}
        </a>
      </DialogTrigger>

      <DialogContent className="w-full flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogTitle className="text-lg">تماس با فروشنده</DialogTitle>
        </DialogHeader>
        <a
          className="bg-brand-600 hover:bg-brand-500 py-3.5 text-lg w-full text-white text-center rounded-lg p-2 px-4"
          href={`tel:${phone}`}
        >
          تماس با تلفن ثابت
        </a>
        <p className="text-lg">{phone}</p>

        <a
          className="bg-brand-600 hover:bg-brand-500 py-3.5 text-lg w-full text-white text-center rounded-lg p-2 px-4"
          href={`tel:${mobile}`}
        >
          تماس با تلفن همراه
        </a>
        <p className="text-lg ">{mobile}</p>
      </DialogContent>
    </Dialog>
  );
};
export default PhoneDialog;
