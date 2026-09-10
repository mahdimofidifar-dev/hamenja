import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="hidden px-4 py-2 border-t bg-brand-50 border-slate-200">
      <div className="flex flex-col gap-3 m-1">
        <p className="font-bold text-lg ">صاحب کسب و کارید؟</p>
        <span className="flex gap-3 ">
          <Link to="#">پنل ادمین کسب و کار</Link>
          <Link to="#">تبلیغات کسب و کار </Link>
        </span>
        <Link
          to="/addvendor"
          className="flex gap-2 w-fit px-6 p-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-500 transition-colors cursor-pointer"
        >
          <CirclePlus /> <span>ثبت کسب و کار در ما</span>
        </Link>
      </div>
      <div className="pages flex flex-col gap-3 m-1">
        <p className="font-bold text-lg ">صفحات ما</p>
        <span className="flex gap-3 text-xl w-90 flex-wrap">
          <Link to="#">درباره ما</Link>
          <Link to="#">پرسش های متداول</Link>
          <br />
          <Link to="#">تماس با ما</Link>
          <Link to="#">قوانین و مقررات</Link>
          <Link to="#">بلاگ</Link>
        </span>
      </div>
      <div className=" m-1 text-lg">
        <p>آدرس</p>
        <p>اصفهان اصفهان میدان آزادی</p>
      </div>
    </footer>
  );
};
export default Footer;
