"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useEffect, useState, useRef } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SanityAsset } from "@sanity/image-url/lib/types/types";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function Slider({ mediaList }: { mediaList: SanityAsset[] }) {
  const [centerIndex, setCenterIndex] = useState(0);
  const centerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const windowWidth = useWindowWidth();

  useGSAP(() => {
    if (animationRef.current) animationRef.current.kill();

    animationRef.current = gsap.timeline({
      delay: 3500,
      onComplete: () => {
        // Restart the interval after animation completes
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          animationRef.current?.restart();
        }, 3500);
      },
    });

    gsap.set(centerRef.current, { opacity: 1, x: 0 });

    animationRef.current
      .to(centerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power1.in",
      })
      .to(centerRef.current, {
        onStart: () => {
          setCenterIndex((c) => (c + 1) % mediaList.length);
        },
        opacity: 1,
        duration: 0.8,
        ease: "power1.in",
      });
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      animationRef.current?.restart();
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  if (windowWidth && windowWidth < 1024) {
    return (
      <div className="pointer-events-none absolute top-0 flex h-dvh w-screen flex-col">
        <div
          id="center"
          ref={centerRef}
          className="relative z-0 mt-auto flex h-[613px] w-screen select-none"
        >
          {mediaList[centerIndex] && (
            <Image
              key={`${mediaList[centerIndex]._key}`}
              className="mx-auto mt-auto w-screen opacity-30 transition-opacity duration-300"
              src={urlFor(mediaList[centerIndex].asset).height(1000).url()}
              fill
              sizes="1000px"
              style={{ objectFit: "cover" }}
              alt=""
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="pointer-events-none absolute top-0 flex h-dvh w-screen flex-col">
        <div
          id="center"
          ref={centerRef}
          className="absolute top-0 z-0 flex h-dvh w-screen select-none sm:h-screen"
        >
          {mediaList[centerIndex] && (
            <Image
              key={`${mediaList[centerIndex]._key}`}
              className="mx-auto mt-auto w-screen opacity-30 transition-opacity duration-300 sm:h-screen"
              src={urlFor(mediaList[centerIndex].asset).height(1000).url()}
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
}
