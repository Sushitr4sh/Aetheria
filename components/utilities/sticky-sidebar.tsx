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

const StickySidebar = ({ children, href, ...props }: StickySidebarProps) => {
  const router = useRouter();
  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Run some exit animation
    const body = document.querySelector("body");
    body?.classList.add("page-transition");

    // Sleep for some time
    await sleep(500);

    router.push(href);

    // Sleep for some time
    await sleep(500);

    // Run some enter animation
    body?.classList.remove("page-transition");
  };

  return (
    <Link
      href={href}
      {...props}
      className="fixed flex items-center -right-8 top-[60%] transform -translate-y-[60%] my-auto -rotate-90 leading-3 px-3 bg-[#1f1f1f]/75 text-white py-1 border rounded-tl-xl rounded-tr-xl"
      onClick={handleTransition}
    >
      {children} <GoogleGeminiIcon size={18} className="ml-2" />
    </Link>
  );
};

export default StickySidebar;
