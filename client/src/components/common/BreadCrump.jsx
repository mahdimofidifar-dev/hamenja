import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const BreadCrump = ({url="/lists"}) => {
  return (
    <Link to={url} className="flex items-center p-4 bg-brand-50 hover:bg-brand-100 hover:text-brand-600 text-text-main">
      <ArrowRight className="size-5" /> <span>بازگشت به «گیم نت ها در اصفهان»</span>
    </Link>
  );
};
export default BreadCrump;
