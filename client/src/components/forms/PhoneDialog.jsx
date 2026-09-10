import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PhoneDialog = ({ contentButton = "تماس", mobile, phone }) => {
  return (
    <Dialog className="w-full">
      <DialogTrigger showCloseButton={false}>
        <Button
          variant="outline"
          className="h-12 px-10 w-auto text-md bg-brand-600 hover:bg-brand-200 text-brand-200 rounded-lg cursor-pointer"
        >
          {contentButton}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogTitle className="text-lg">تماس با فروشنده</DialogTitle>
        </DialogHeader>
        <a
          className="bg-brand-500 text-lg w-full text-center rounded-lg p-2 px-4"
          href={`tel:${phone}`}
        >
          تماس با تلفن ثابت
        </a>
        <p className="text-lg">{phone}</p>

        <a
          className="bg-brand-500 text-lg w-full text-center rounded-lg p-2 px-4"
          href={`tel:${mobile}`}
        >
          تماس با تلفن همراه
        </a>
        <p className="text-lg">{mobile}</p>
      </DialogContent>
    </Dialog>
  );
};
export default PhoneDialog;
