"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import TalomeLogo from "../../public/talome-logo.svg";
import { useState, useEffect } from "react";

export default function LandingInfo({ info }: { info: any }) {
  const windowWidth = useWindowWidth();
  const [infoOpen, setInfoOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (windowWidth && windowWidth < 1024) {
    return (
      <div className="relative z-20 flex h-dvh w-screen flex-col overflow-hidden p-[10px] uppercase">
        <div
          className={`z-30 mx-auto w-full text-[11px] leading-[96%] tracking-[4%] transition-opacity duration-700 ${
            infoOpen ? "opacity-100 delay-300" : "opacity-0"
          }`}
        >
          <p>{info.statement}</p>
          <br />
          <p>
            <span>email: </span>
            <a className="underline" href={`mailto:${info.email}`}>
              {info.email}
            </a>
            , <span>instagram: </span>
            <a
              className="underline"
              href={`https://instagram.com/${info.instagram}`}
              target="_blank"
            >
              {info.instagram}
            </a>
          </p>
        </div>

        <div
          className={`fixed left-0 top-0 z-20 h-dvh w-screen bg-white transition-transform duration-700 ease-in-out ${
            isMounted
              ? infoOpen
                ? "translate-y-0"
                : "translate-y-full"
              : "translate-y-full opacity-0"
          }`}
        ></div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setInfoOpen(!infoOpen);
          }}
          className={`absolute bottom-0 left-1/2 z-30 mb-[6px] flex -translate-x-1/2 transform items-center justify-center text-[12px] transition-opacity ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="mt-[4px]">{infoOpen ? "CLOSE" : "ABOUT"}</span>
        </button>

        <Image
          className={`absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform transition-opacity ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
          alt="Talome Logo"
          src={TalomeLogo}
          width="277"
          height="18"
        />
      </div>
    );
  } else {
    return (
      <div className="z-20 my-auto grid grid-cols-2 pt-10 uppercase">
        <Image className="ml-[10px]" alt="Talome Logo" src={TalomeLogo} width="633" height="41" />

        <div className="mx-auto mt-[1px] w-[470px] text-[12px] leading-[96%] tracking-[3.6%]">
          <p>{info.statement}</p>
          <br />
          <p>
            <span>email: </span>
            <a className="hover:underline" href={`mailto:${info.email}`}>
              {info.email}
            </a>
            , <span>instagram: </span>
            <a
              className="hover:underline"
              href={`https://instagram.com/${info.instagram}`}
              target="_blank"
            >
              {info.instagram}
            </a>
          </p>
        </div>
      </div>
    );
  }
}
