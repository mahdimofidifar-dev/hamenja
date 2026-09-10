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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneBusiness } from "../../api/business";

const VenderDetail = () => {
  const { uniqName } = useParams();
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getOneBusiness(uniqName);
        console.log(data);
        setBusiness(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (uniqName) fetchData();
  }, [uniqName]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>loading...</p>
      </div>
    );
  }

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
            <div className="job-title font-bold text-xl">{business.title}</div>
            <div className="job-descreption text-md">
              {business.description}
            </div>
          </div>
        </div>

        <div className="varifayed flex gap-1 p-1 px-2 rounded-2xl bg-brand-200 w-fit">
          <Check /> دارای تأیید پایه از همینجا
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
      <Carousel images={business.gallery} />
      <span className="text-xl font-bold px-4">درباره کسب‌و‌کار</span>
      <DividerTitle title="آدرس" />
      <AddressBox props={business.address} />
      <DividerTitle title="اطلاعات تماس" />
      <CallInfo mobile={business.mobile} phone={business.phone} />
      <DividerTitle title="ساعات کاری" />
      <DividerTitle title="توضیحات" />
      <ReadMore text={business.description} limitLines={5} />
      <DividerTitle title="نظرات" />
      <ReviewsSection />
      <Footer />
      <StickyNav
        phone={business.phone}
        latitude={business.latitude}
        longitude={business.longitude}
      />
    </div>
  );
};

export default VenderDetail;
