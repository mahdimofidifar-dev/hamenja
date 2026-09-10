import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PhoneDialog = ({ contentButton="تماس" }) => {
  return (
    <Dialog className="w-full">
      <DialogTrigger showCloseButton={false} asChild>
        <Button
          variant="outline"
          className="h-12 px-10 w-auto text-md bg-brand-600 hover:bg-brand-200 text-brand-200 rounded-lg cursor-pointer"
        >
          {contentButton}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-lg">تماس با فروشنده</DialogTitle>
        </DialogHeader>
        <a
          className="bg-brand-500 w-full text-center rounded-lg p-2 px-4"
          href="tel:09356279099"
        >
          تماس
        </a>
      </DialogContent>
    </Dialog>
  );
};
export default PhoneDialog;
