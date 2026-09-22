// import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselY({ img = [], className, col }) {
  const uploadUrl = import.meta.env.VITE_UPLOAD_URL;

  return (
    <Carousel
      className={className}
      dir="rtl"
      opts={{
        align: "start",
        direction: "rtl",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="h-full">
        {img.map((url) => (
          <CarouselItem
            key={Math.random(1, 100)}
            className={`size-full  basis-1/${col}`}
          >
            <div className="w-72 h-48 overflow-hidden rounded-xl">
              <img
                src={`${uploadUrl}${url}`}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
