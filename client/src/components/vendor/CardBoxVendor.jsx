import { CarouselY } from "@/components/common/CarouselY";
import PhoneDialog from "@/components/forms/PhoneDialog";
import { MapPin, MoreHorizontal, Phone } from "lucide-react";
import { Link } from "react-router-dom";
const img = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFzuYME_c74VB_FFhy3aKERnjtwl5L7CnGQV90a_rAbA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWcpocZdujtUxGfCuheL4I2sxYvIcFVgN5vsynDMAWK9uw48QMMUVXNVT&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFzuYME_c74VB_FFhy3aKERnjtwl5L7CnGQV90a_rAbA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWcpocZdujtUxGfCuheL4I2sxYvIcFVgN5vsynDMAWK9uw48QMMUVXNVT&s=10",
];
const CardBox = ({ url = "/infoPage" }) => {
  return (
    <div className="box flex flex-col rounded-xl border gap-2 p-3">
      <div className="name text-2xl">سلمونی حسن کچل</div>
      <div className="descreption text-md text-slate-500">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است
      </div>
      {/* <div className="flex">
              <Star /> بدون نظر{" "}
              <div className="size-4 border-5 rounded-full border-neutral-400"></div>
              <span>بسته تا</span>
              <span className="open-time">09:00</span>
            </div> */}
      <div className="flex items-center text-slate-500">
        <MapPin />
        <div className="address">اصفهان میدان آزادی</div>
      </div>
      <CarouselY col="3" className="" img={img} />
      <div className="cont flex w-full justify-evenly">
        <PhoneDialog
          contentButton={
            <span className="flex gap-2 items-center justify-center">
              <Phone className="size-4.5" /> تماس
            </span>
          }
        />
        <Link
          to={url}
          className="flex h-12 w-36 justify-center text-md items-center border rounded-md gap-2"
        >
          <MoreHorizontal className="size-4.5" />
          جزئیات ببشتر
        </Link>
        <span></span>
      </div>
    </div>
  );
};
export default CardBox;
