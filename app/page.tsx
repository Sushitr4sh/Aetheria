import React from "react";

import Image from "next/image";
import MainHeader from "@/components/header/main-header";
import ZoopText from "@/components/utilities/zoop-text";

import StickySidebar from "@/components/utilities/sticky-sidebar";
import ChatbotMenu from "@/components/chatbot/chatbot-menu";
import ClipPathImage from "@/components/utilities/clip-path-image";

const Home = () => {
  return (
    <>
      <section className="flex flex-col w-full h-[100dvh] relative">
        <MainHeader />
        <main className="px-6 mt-8">
          <ZoopText delay={0}>Start your</ZoopText>
          <ZoopText delay={0.25}>journey &</ZoopText>
          <ZoopText delay={0.5}>discover</ZoopText>
          <ClipPathImage backgroundImage="/images/hero01.jpg" />
          <span className="text-gray-400">
            <ZoopText delay={0.85}>peace</ZoopText>
          </span>
        </main>
        <article className="absolute px-6 pb-4 bottom-0 text-lg w-full">
          At widelab we plan, design and market delightful digital products.
        </article>
        <StickySidebar />
        <ChatbotMenu />
      </section>
      <section className="h-[100vh] w-full"></section>
    </>
  );
};

export default Home;
