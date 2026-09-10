import { CarouselY } from "@/components/common/CarouselY";
import PhoneDialog from "@/components/forms/PhoneDialog";
import { MapPin, MoreHorizontal, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CardBox = ({ props }) => {
  return (
    <div className="box flex flex-col rounded-xl border gap-2 p-3">
      <div className="name text-2xl">{props.title}</div>
      <div className="descreption text-md text-slate-500">
        {props.description}
      </div>
      {/* <div className="flex">
              <Star /> بدون نظر{" "}
              <div className="size-4 border-5 rounded-full border-neutral-400"></div>
              <span>بسته تا</span>
              <span className="open-time">09:00</span>
            </div> */}
      <div className="flex items-center text-slate-500">
        <MapPin />
        <div className="address">{props.address}</div>
      </div>
      <CarouselY col="3" className="" img={props.gallery} />
      <div className="cont flex w-full justify-evenly">
        <PhoneDialog
          contentButton={
            <span className="flex gap-2 items-center justify-center">
              <Phone className="size-4.5" /> تماس
            </span>
          }
        />
        <Link
          to={`/lists/${props.uniqName}`}
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
