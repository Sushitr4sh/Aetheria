"use client";
import React, { useState, useEffect } from "react";

// Next
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

// Component
import MainHeader from "@/components/header/MainHeader";
import Sidebar from "@/components/header/Sidebar";

// CSS

// Image

// Logo

// External
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import ZoopText from "@/components/utilities/ZoopText";
import FadeInText from "@/components/utilities/FadeInText";

const Journal = () => {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
    <section className="flex flex-col w-full h-[100dvh]">
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      <article className="px-6 mt-28">
        <div className="md:hidden">
          <ZoopText delay={0.25}>My Journal</ZoopText>
        </div>
        <div className="w-full mt-24 relative">
          <div className="border-t-[1px] border-[#999999]" />
          <Image
            src={session?.user.image || "/images/no-user.jpg"}
            alt="Journal picture"
            width={120}
            height={120}
            className="rounded-full absolute left-8 -top-[60px]"
          />
        </div>
        <div className="flex gap-x-4 mt-20 items-center w-full">
          <div className="mb-1">
            <p className="text-3xl">{session?.user.name}</p>
            <p className="text-gray-400">{session?.user.email}</p>
          </div>
          <div className="flex flex-grow justify-center">
            <button
              type="button"
              onClick={handleSignOut}
              className="text-lg px-6 py-1 text-[#f73434] border border-[#f73434] rounded-full"
            >
              Sign Out
            </button>
          </div>
        </div>
      </article>
      <div className="absolute px-6 pb-6 bottom-0">
        <FadeInText delay={2.25}>
          Your Aetheria profile is your personal space to track moods, journal,
          and explore AI tools for mental well-being.
        </FadeInText>
      </div>
    </section>
  );
};

export default Journal;
