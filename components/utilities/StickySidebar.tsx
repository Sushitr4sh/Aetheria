"use client";
import React, { ReactNode } from "react";

// Next
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

// Component

// CSS

// Image

// Logo
import { GoogleGeminiIcon } from "hugeicons-react";

// External
interface StickySidebarProps extends LinkProps {
  children: ReactNode;
  href: string;
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const StickySidebar = () => {
  return (
    <div className="fixed flex items-center gap-x-2 px-4 text-xl py-2 right-0 top-[55%] leading-3 bg-[#1f1f1f]/75 text-white rounded-tl-xl rounded-tr-xl z-50 transform -rotate-90 translate-x-[3.5rem]">
      <span>Prototype</span>
      <GoogleGeminiIcon size={18} />
    </div>
  );
};

export default StickySidebar;
