import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BreadCrump = ({ text = "بازگشت" }) => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <Link
      onClick={backHandler}
      className="flex items-center justify-center gap-3 p-4 bg-brand-50 hover:bg-brand-100 hover:text-brand-600 text-text-main"
    >
      <ArrowRight className="size-5" /> <span>{text}</span>
    </Link>
  );
};
export default BreadCrump;
