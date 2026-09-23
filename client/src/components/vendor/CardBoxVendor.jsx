import { CarouselY } from "@/components/common/CarouselY";
import PhoneDialog from "@/components/forms/PhoneDialog";
import {
  MapPin,
  MoreHorizontal,
  Phone,
  Star,
  CircleIcon,
  CircleDot,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toPersianDigits, openInfo } from "@/utils/businessTime";

const CardBox = ({ props }) => {
  const isOpen = openInfo(props);
  console.log(isOpen);

  return (
    <div className="box flex  flex-col rounded-xl border border-brand-100 gap-2 p-3">
      <div className="name text-2xl">{props.title}</div>
      <div className="description text-md text-slate-500 line-clamp-2">
        {props.description}
      </div>
      <div className="flex  gap-2 text-text-muted">
        {
          <div className="flex gap-0.5">
            <div className="relative w-5 h-5">
              <Star className="absolute right-0 w-5 h-5 text-yellow-400" />
              <div
                className="absolute inset-y-0 right-0 overflow-hidden"
                style={{ width: `${props.rate * 10 * 2}%` }}
              >
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="flex items-center justify-center h-fit">
              {props.rate}
            </div>
          </div>
        }
        {isOpen === true ? (
          <div className="flex gap-1 items-center">
            <CircleDot className="size-5 text-green-500 fill-green-200 " />
            <span>باز است</span>
          </div>
        ) : (
          <div className=" flex gap-1 items-center">
            <CircleIcon className="size-5 text-red-500 fill-red-200" />
            <span>بسته تا {toPersianDigits(props.openTime)}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-slate-500">
        <MapPin className="size-5" />
        <div className="address">{props.address}</div>
      </div>

      <CarouselY col="3" className="" img={props.gallery} />

      <div className="cont flex w-full justify-evenly">
        <PhoneDialog
          mobile={props.mobile}
          phone={props.phone}
          contentButton={"تماس"}
        />
        <Link
          to={`/businesses/${props.uniqName}`}
          className="flex  w-36 justify-center text-md items-center border rounded-md gap-2"
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
