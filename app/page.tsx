"use client";
import React, { useState, useEffect } from "react";

// Next
import Link from "next/link";

// Component
import PersistentFlashMessage from "@/components/utilities/PersistentFlashMessage";
import MainHeader from "@/components/header/MainHeader";
import ZoopText from "@/components/utilities/ZoopText";
import Sidebar from "@/components/header/Sidebar";
import StickySidebar from "@/components/utilities/StickySidebar";
import Parallax from "@/components/content/Parallax";

// CSS

// Image
import Hero01Img from "@/public/images/hero01.jpg";

// Logo
import ClipPathImage from "@/components/utilities/ClipPathImage";
import FadeInText from "@/components/utilities/FadeInText";

// External
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const Home = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [showPostTestMessage, setShowPostTestMessage] = useState(false);

  useEffect(() => {
    // Delay showing the message by 3 seconds
    const timer = setTimeout(() => {
      setShowPostTestMessage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute w-full h-[100dvh]">
      <PersistentFlashMessage
        isVisible={showPostTestMessage}
        onClose={() => setShowPostTestMessage(false)}
      >
        After using the application for 7 days, you can access the Post-Test
        Questionare{" "}
        <Link
          className="underline"
          href="https://docs.google.com/forms/d/10lkmj87IS0ZptU6XGtWjGo4YUyQj6u-2Ysi0u5PWgs0/edit"
        >
          here
        </Link>
      </PersistentFlashMessage>
      <StickySidebar />
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      <section className="flex flex-col w-full h-[100dvh] fixed top-0 left-0 -z-50">
        <article className="container px-6 lg:px-8 mt-24">
          <div className="">
            <div className="">
              <div className="sm:hidden">
                <ZoopText delay={0.25}>Start your</ZoopText>
                <ZoopText delay={0.5}>journey &</ZoopText>
                <ZoopText delay={0.75}>discover</ZoopText>
                <ClipPathImage backgroundImage={Hero01Img} delay={1.75} />
                <span className="text-[#b3b3b3]">
                  <ZoopText delay={1.1}>peace</ZoopText>
                </span>
              </div>
              <div className="hidden sm:block lg:hidden">
                <ZoopText delay={0.25}>Start your journey</ZoopText>
                <ZoopText delay={0.5}>& discover</ZoopText>
                <ClipPathImage backgroundImage={Hero01Img} delay={1.75} />
                <span className="text-[#b3b3b3]">
                  <ZoopText delay={0.75}>peace</ZoopText>
                </span>
              </div>
              <div className="hidden lg:block">
                <ZoopText delay={0.25}>Start your journey &</ZoopText>
                <div className="flex">
                  <ZoopText delay={0.5}>discover</ZoopText>
                  <ClipPathImage backgroundImage={Hero01Img} delay={1.75} />
                  <span className="text-[#b3b3b3] ml-[2rem]">
                    <ZoopText delay={0.75}>peace</ZoopText>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
        <div className="absolute px-6 lg:px-12 pb-6 lg:pb-12 bottom-0">
          <div className="container mx-auto">
            <div className="lg:max-w-2xl">
              <FadeInText delay={2.25}>
                At Aetheria, we design and create digital tools that empower
                mental well-being.
              </FadeInText>
            </div>
          </div>
        </div>
      </section>
      <Parallax />
    </div>
  );
};

export default Home;
