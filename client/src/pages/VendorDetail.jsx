import BreadCrump from "../components/common/BreadCrump";
import { Star, CircleIcon, Check } from "lucide-react";
import Carousel from "@/components/common/Carousel";
import AddressBox from "@/components/vendor/AddressBox";
import DividerTitle from "@/components/common/DividerTItle";
import CallInfo from "@/components/vendor/CallInfo";
import ReadMore from "@/components/common/ReadMore";
import ReviewsSection from "@/components/vendor/ReviewsSection";
import StickyNav from "@/components/common/StickyNav";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
const img = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFzuYME_c74VB_FFhy3aKERnjtwl5L7CnGQV90a_rAbA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWcpocZdujtUxGfCuheL4I2sxYvIcFVgN5vsynDMAWK9uw48QMMUVXNVT&s=10",
];

const VenderDetail = () => {
  const description =
    "این یک متن طولانی درباره معرفی کسب‌وکار است که شامل اطلاعات کامل، لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. ارائه شده، قوانین مجموعه و توضیحات تکمیلی دیگر می‌باشد. کاربر در حالت عادی فقط چند خط اول را می‌بیند و با کلیک روی مشاهده بیشتر، کل متن باز می‌شود.";
  return (
    <div className="bg-bg-light ">
      <Header />
      <BreadCrump />
      <div className="profile px-4">
        <div className="head flex w-full py-3 gap-3">
          <div className="job-logo">
            <img src="/public/profile.jpg" className="rounded-full size-18" />
          </div>
          <div className="detail flex flex-col justify-around">
            <div className="job-title font-bold text-xl">کافه موناکو</div>
            <div className="job-descreption text-md">
              کافه و کافی شاپ و صبحانه و املت و نیمرو،هات چیپس
            </div>
          </div>
        </div>

        <div className="varifayed flex gap-1 p-1 px-2 rounded-2xl bg-brand-200 w-fit">
          {" "}
          <Check /> دارای تأیید پایه از our site
        </div>
        <div className="more-detail">
          <div className="flex items-center gap-0.5 text-text-muted">
            <Star className="size-5" />
            <span>بدون نظر</span> <CircleIcon className="size-5" />
            <span className="status">بسته</span>
            <span>تا 08:00 </span>
          </div>
        </div>
      </div>
      <Carousel images={img} />
      <span className="text-xl font-bold px-4">درباره کسب‌و‌کار</span>
      <DividerTitle title="آدرس" />
      <AddressBox />
      <DividerTitle title="اطلاعات تماس" />
      <CallInfo />
      <DividerTitle title="ساعات کاری" />
      <DividerTitle title="توضیحات" />
      <ReadMore text={description} limitLines={5} />
      <DividerTitle title="نظرات" />
      <ReviewsSection />
      <Footer />
      <StickyNav />
    </div>
  );
};

export default VenderDetail;
