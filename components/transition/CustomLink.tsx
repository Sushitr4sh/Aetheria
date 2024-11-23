"use client";
import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const CustomLink = ({
  href,
  children,
  className,
  ...props
}: CustomLinkProps) => {
  const router = useRouter();

  const handleTransition = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // Prevent default link behavior
    e.preventDefault();

    // Trigger the exit transition immediately
    const transitionOverlay = document.querySelector(
      '[data-transition="overlay"]'
    ) as HTMLElement;

    if (transitionOverlay) {
      // Start the transition immediately
      transitionOverlay.style.width = "100%";

      // Navigate after a short delay to allow transition to be visible
      setTimeout(() => {
        router.push(href.toString());
      }, 750); // Adjust this to match your transition duration
    } else {
      // Fallback navigation if overlay not found
      router.push(href.toString());
    }
  };

  return (
    <Link
      href={href}
      {...props}
      className={className}
      onClick={handleTransition}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
