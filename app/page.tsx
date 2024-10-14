"use client";
import React, { useState } from "react";

// Next

// Component
import MainHeader from "@/components/header/main-header";
import ZoopText from "@/components/utilities/zoop-text";
import Transition from "@/components/transition/transition";

// CSS

// Image
import Hero01Img from "@/public/images/hero01.jpg";

// Logo
import StickySidebar from "@/components/utilities/sticky-sidebar";
import ChatbotMenu from "@/components/chatbot/chatbot-menu";
import ClipPathImage from "@/components/utilities/clip-path-image";
import FadeInText from "@/components/utilities/fade-in-text";

// External
import { AnimatePresence } from "framer-motion";
import Sidebar from "@/components/header/sidebar";

const Home = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
    <>
      {/* <Transition /> */}
      <section className="flex flex-col w-full h-[100dvh] relative">
        <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
        <main className="px-6 mt-8">
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
        </main>
        <FadeInText delay={2.25}>
          At Aetheria, we design and create digital tools that empower mental
          well-being.
        </FadeInText>
        <StickySidebar href="/chat">Luna</StickySidebar>
        <ChatbotMenu />
      </section>
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      {/* <section className="h-[100vh] w-full"></section> */}
    </>
  );
};

export default Home;
