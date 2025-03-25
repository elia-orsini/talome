"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";

import TalomeLogo from "../../public/talome-logo.svg";

export default function LandingInfo({ info }: { info: any }) {
  const windowWidth = useWindowWidth();

  if (windowWidth && windowWidth < 769) {
    return (
      <div className="z-20 flex h-dvh w-screen flex-col p-[10px] uppercase">
        <div className="mx-auto w-full text-[11px] leading-[96%] tracking-[4%]">
          <p>{info.statement}</p>
          <p className="[&>a]:!text-[#BABABA]">
            <span>email: </span>
            <a href={`mailto:${info.email}`}>{info.email}</a>, <span>instagram: </span>
            <a href={`https://instagram.com/${info.instagram}`} target="_blank">
              {info.instagram}
            </a>
          </p>
        </div>

        <Image className="m-auto" alt="Talome Logo" src={TalomeLogo} width="277" height="18" />
      </div>
    );
  } else {
    return (
      <div className="z-20 my-auto grid grid-cols-2 uppercase">
        <Image
          className="my-auto ml-[10px]"
          alt="Talome Logo"
          src={TalomeLogo}
          width="633"
          height="41"
        />

        <div className="mx-auto w-[470px] text-[12px] leading-[96%] tracking-[3.6%]">
          <p>{info.statement}</p>
          <p className="[&>a]:!text-[#BABABA]">
            <span>email: </span>
            <a href={`mailto:${info.email}`}>{info.email}</a>, <span>instagram: </span>
            <a href={`https://instagram.com/${info.instagram}`} target="_blank">
              {info.instagram}
            </a>
          </p>
        </div>
      </div>
    );
  }
}
