"use client";
import React, { useState, useEffect } from "react";

// Next

// Component
import MainHeader from "@/components/header/MainHeader";
import ZoopText from "@/components/utilities/ZoopText";
import Sidebar from "@/components/header/Sidebar";
import Parallax from "@/components/content/Parallax";

// CSS

// Image
import Hero01Img from "@/public/images/hero01.jpg";

// Logo
import StickySidebar from "@/components/utilities/StickySidebar";
import ChatbotMenu from "@/components/chatbot/ChatbotMenu";
import ClipPathImage from "@/components/utilities/ClipPathImage";
import FadeInText from "@/components/utilities/FadeInText";

// External
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const Home = () => {
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
    <div className="absolute w-full h-[100dvh]">
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      <section className="flex flex-col w-full h-[100dvh] fixed top-0 left-0 -z-50">
        <article className="px-6 mt-28">
          <div className="md:hidden">
            <ZoopText delay={0.25}>Start your</ZoopText>
            <ZoopText delay={0.5}>journey &</ZoopText>
            <ZoopText delay={0.75}>discover</ZoopText>
            <ClipPathImage backgroundImage={Hero01Img} delay={1.75} />
            <span className="text-[#b3b3b3]">
              <ZoopText delay={1.1}>peace</ZoopText>
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
        <div className="absolute px-6 pb-6 bottom-0">
          <FadeInText delay={2.25}>
            At Aetheria, we design and create digital tools that empower mental
            well-being.
          </FadeInText>
        </div>
        <StickySidebar href="/chat">Luna</StickySidebar>
        <ChatbotMenu />
      </section>
      <Parallax />
    </div>
  );
};

export default Home;
