"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

export default function Slider({ mediaList }: { mediaList: SanityAsset[] }) {
  const [centerIndex, setCenterIndex] = useState(0);
  const [change, setChange] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setChange((c) => !c);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.to("#center", {
      opacity: 0,
      delay: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to("#center", {
      onStart: () => {
        setCenterIndex((c) => c + 1);
      },
      opacity: 100,
      delay: 1,
      duration: 2,
      ease: "power2.inOut",
    });
  }, [change]);

  return (
    <div className="pointer-events-none absolute top-0 flex h-dvh w-screen flex-col">
      <div id="center" className="sm:h-screenl absolute top-0 z-0 flex h-dvh w-screen select-none">
        {centerIndex != undefined && mediaList[centerIndex % mediaList.length] && (
          <Image
            key={`${mediaList[centerIndex % mediaList.length]._key}`}
            className={`mx-auto mt-auto w-screen opacity-30 transition-opacity duration-300 sm:h-screen`}
            src={urlFor(mediaList[centerIndex % mediaList.length].asset)
              .height(1000)
              .url()}
            width={0}
            height={0}
            sizes="1000px"
            style={{ objectFit: "contain" }}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
