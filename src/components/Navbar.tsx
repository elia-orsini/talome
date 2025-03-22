"use client";

import Link from "next/link";

import { useWebsiteStore } from "@/store/useEditorStore";
import { useEffect } from "react";

export default function Navbar({ activePageIndex }: { activePageIndex?: number }) {
  const { setNavBarText, navBarText } = useWebsiteStore();

  useEffect(() => {
    if (activePageIndex) {
      setNavBarText("");
    }
  }, [activePageIndex, setNavBarText]);

  return (
    <div
      className={`min-w-screen relative z-40 mt-5 flex w-screen flex-row justify-between px-1.5 sm:grid`}
    >
      <Link href="/" className="my-auto">
        Talome
      </Link>
    </div>
  );
}
