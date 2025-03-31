"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { SanityAsset } from "@sanity/image-url/lib/types/types";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { cropRatio } from "@/sanity/cropRatio";
import useWindowHeight from "@/hooks/useWindowHeight";

export default function Slider({ mediaList }: { mediaList: SanityAsset[] }) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const swiperRef = useRef<any>(null);
  const swiperRefMobile = useRef<any>(null);
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const [hovered, setHovered] = useState<boolean>(false);

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
      if (swiperRefMobile.current) {
        swiperRefMobile.current.slideNext();
      }
    }, 5000);
  };

  const handleSlideChange = () => {
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (swiperRef.current) {
        const clickX = event.clientX;
        if (clickX < windowWidth! / 2) {
          if (swiperRef.current) {
            swiperRef.current.slidePrev();
          }
          if (swiperRefMobile.current) {
            swiperRefMobile.current.slidePrev();
          }
        } else {
          if (swiperRef.current) {
            swiperRef.current.slideNext();
          }
          if (swiperRefMobile.current) {
            swiperRefMobile.current.slideNext();
          }
        }

        startAutoSlide();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [swiperRef, swiperRefMobile, windowWidth]);

  if (windowWidth && windowWidth < 1024) {
    return (
      <div className="pointer-events-none absolute top-0 flex h-dvh w-screen flex-col">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          virtualTranslate={false}
          loop={true}
          modules={[FreeMode]}
          freeMode={true}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            swiperRefMobile.current = swiper;
            startAutoSlide();
          }}
          speed={300}
          className="pointer-events-none h-dvh w-screen"
          centeredSlides={true}
          key="unique-key-desktop"
        >
          {mediaList.map(
            (media) =>
              media && (
                <SwiperSlide key={`${media._key}`} className="z-0 !flex h-dvh w-screen">
                  <div className="relative z-0 mt-auto h-dvh w-screen">
                    <Image
                      className="mx-auto w-screen opacity-30 transition-opacity duration-300"
                      src={urlFor(media.asset).height(1000).url()}
                      fill
                      sizes="1000px"
                      style={{ objectFit: "cover" }}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    );
  } else {
    return (
      <div className="absolute top-0 flex h-dvh w-screen flex-col">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          virtualTranslate={false}
          loop={true}
          modules={[FreeMode]}
          freeMode={true}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            startAutoSlide();
          }}
          speed={400}
          allowTouchMove={false}
          className={`h-dvh w-screen ${hovered ? "!z-50" : ""}`}
          centeredSlides={true}
          key="unique-key-desktop"
        >
          {mediaList.map(
            (media) =>
              media && (
                <SwiperSlide key={`${media._key}`} className={"!flex h-dvh w-screen"}>
                  <div
                    className="absolute left-1/2 top-1/2 z-10 mx-auto -translate-x-1/2 -translate-y-1/2 transform"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                      width: cropRatio(media.asset._ref) * windowHeight!,
                      height: windowHeight!,
                    }}
                  />
                  <div className="pointer-events-none relative mt-auto h-screen w-screen">
                    <Image
                      className={`mx-auto w-max transition-opacity duration-700 ${hovered ? "opacity-100" : "opacity-30"}`}
                      src={urlFor(media.asset).height(1000).url()}
                      fill
                      sizes="1000px"
                      style={{ objectFit: "contain" }}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    );
  }
}
