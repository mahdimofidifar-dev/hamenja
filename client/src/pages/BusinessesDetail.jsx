import BreadCrump from "../components/common/BreadCrump";
import { Star, CircleIcon, Check, CircleDot } from "lucide-react";
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
import { getOneBusiness } from "../apis/business";
import { toPersianDigits, openInfo } from "@/utils/businessTime";
import BusinessAmenities from "@/components/vendor/BusinessAmenitie";
import BusinessHours from "@/components/vendor/BusinessHours";

const BusinessDetail = () => {
  const { uniqName } = useParams();
  const [business, setBusiness] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getOneBusiness(uniqName);
        setBusiness(data);
      } catch (error) {
        console.error(error);
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
  const isOpen = openInfo(business);
  const uploadUrl = import.meta.env.VITE_UPLOAD_URL;
  console.log(uploadUrl + business.logo);

  return (
    <div className="">
      <Header />
      <BreadCrump />
      <div className="profile px-4">
        <div className="head flex w-full py-3 gap-3">
          <div className="job-logo">
            <img
              src={`${uploadUrl}${business.logo}`}
              className="rounded-full size-18"
            />
          </div>
          <div className="detail flex flex-col justify-around">
            <div className="job-title font-bold text-xl">{business.title}</div>
            <div className="job-description text-md line-clamp-2">
              {business.description}
            </div>
          </div>
        </div>

        <div className="verified flex gap-1 p-1 px-2 mb-2 rounded-2xl bg-brand-200 w-fit">
          <Check /> دارای تأیید پایه از همینجا
        </div>
        <div className="more-detail">
          <div className="flex gap-2 text-text-muted">
            {
              <div className="flex gap-0.5">
                <div className="relative w-5 h-5">
                  <Star className="absolute right-0 w-5 h-5 text-yellow-400" />
                  <div
                    className="absolute inset-y-0 right-0 overflow-hidden"
                    style={{ width: `${business.rate * 10 * 2}%` }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div className="flex items-center justify-center h-fit">
                  {business.rate}
                </div>
              </div>
            }
            <div className="flex items-center gap-0.5">
              {isOpen ? (
                <div className="flex gap-1 items-center">
                  <CircleDot className="size-5 text-green-500 fill-green-200 " />
                  <span>باز است</span>
                </div>
              ) : (
                <div className=" flex gap-1 items-center">
                  <CircleIcon className="size-5 text-red-500 fill-red-200" />
                  <span>بسته تا {toPersianDigits(business.openTime)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Carousel images={business.gallery} />
      <span className="text-xl font-bold px-4">درباره کسب‌و‌کار</span>
      <DividerTitle title="آدرس" />
      <AddressBox props={business} />
      <DividerTitle title="اطلاعات تماس" />
      <CallInfo mobile={business.mobile} phone={business.phone} />
      <DividerTitle title="امکانات" />
      <BusinessAmenities amenities={business.amenities} />
      <DividerTitle title="ساعات کاری" />
      <BusinessHours
        workingHours={business.workingHours}
        is24Hours={business.is24Hours}
      />
      <DividerTitle title="توضیحات" />
      <ReadMore text={business.description} />
      <DividerTitle title="نظرات" />
      <ReviewsSection businessId={business._id} comments={business.comments} />
      <Footer />
      <StickyNav
        phone={business.phone}
        mobile={business.mobile}
        latitude={business.latitude}
        longitude={business.longitude}
      />
    </div>
  );
};

export default BusinessDetail;
