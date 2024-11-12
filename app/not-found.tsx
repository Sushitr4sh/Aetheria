"use client";
import React, { useState, useEffect } from "react";

// Next
import Link from "next/link";
import { Metadata } from "next";

// Component
import MainHeader from "@/components/header/MainHeader";
import ZoopText from "@/components/utilities/ZoopText";
import Sidebar from "@/components/header/Sidebar";
import Parallax from "@/components/content/Parallax";

// CSS

// Image
import Hero01Img from "@/public/images/hero01.jpg";
import Gif404 from "@/public/gifs/gif404.gif";

// Logo
import StickySidebar from "@/components/utilities/StickySidebar";
import ChatbotMenu from "@/components/chatbot/ChatbotMenu";
import ClipPathImage from "@/components/utilities/ClipPathImage";
import FadeInText from "@/components/utilities/FadeInText";

// External
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import Lenis from "lenis";
import ArrowButton from "@/components/utilities/ArrowButton";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
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
    <div className="w-full h-[100dvh]">
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      <section className="flex flex-col w-full h-[100dvh] top-0 left-0 -z-50">
        <article className="px-6 mt-28">
          <div className="md:hidden">
            <ZoopText delay={0.25}>404 Error.</ZoopText>
            <ZoopText delay={0.5}>Upsss!</ZoopText>
            <ClipPathImage backgroundImage={Gif404} gif delay={1.75} />
            <span className="text-[#b3b3b3]">
              <ZoopText delay={0.85}>Get Back on</ZoopText>
              <ZoopText delay={1.1}>track.</ZoopText>
            </span>
          </div>
          <div className="hidden">
            <ZoopText delay={0.25}>Start your journey &</ZoopText>
            <div className="flex gap-x-4">
              <ZoopText delay={0.5}>discover</ZoopText>
              <ClipPathImage backgroundImage={Hero01Img} delay={1.5} />
              <span className="text-gray-400">
                <ZoopText delay={0.5}>peace</ZoopText>
              </span>
            </div>
          </div>
        </article>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: easeInOut, delay: 2.25 }}
          className="absolute px-6 pb-6 bottom-0 w-full z-50"
        >
          <Link href="/">
            <ArrowButton number="01">Back to home</ArrowButton>
          </Link>
          <Link href="/contact-us">
            <ArrowButton number="02">Contact us</ArrowButton>
            <div className="w-full border-b border-gray-300" />
          </Link>
        </motion.div>
        <ChatbotMenu />
      </section>
    </div>
  );
};

export default NotFound;
