// import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import { dir } from "node:console";

export function CarouselY({ img, className, col }) {
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
          <CarouselItem className={`size-full  basis-1/${col}`}>
            <div class="w-72 h-48 overflow-hidden rounded-xl">
              <img src={url} class="w-full h-full object-cover" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselNext />
      <CarouselPrevious /> */}
    </Carousel>
  );
}
