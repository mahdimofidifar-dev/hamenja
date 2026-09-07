import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Carousel({ images = [1, 2, 3, 4, 5] }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          1024: { slidesPerView: 1, spaceBetween: 24 },
        }}
        className="mySwiper rounded-2xl overflow-hidden shadow-lg [--swiper-navigation-color:#ffffff] [--swiper-navigation-size:20px] [--swiper-pagination-color:#6366f1] [--swiper-pagination-bullet-inactive-color:#9ca3af]"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="w-full h-64 md:h-80 bg-slate-800 border border-slate-700 rounded-2xl flex flex-col items-center justify-center text-white font-bold text-3xl select-none group cursor-pointer overflow-hidden relative">
              {/* <span>Slide {item}</span> */}
              <img src={item} alt="" />

              <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
