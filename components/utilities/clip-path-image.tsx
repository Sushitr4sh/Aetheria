"use client";

import React from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import Hero01Img from "@/public/images/hero01.jpg";

const ClipPathImage = ({ backgroundImage }: { backgroundImage: string }) => {
  return (
    <div className="relative w-[70%] overflow-hidden my-2">
      <motion.div
        className="bg-white w-full h-full z-10 absolute border-black"
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        style={{ transition: "all ease-out 0.225s" }}
        transition={{ delay: 1.75 }}
        /* transition={{
          ease: cubicBezier(0.98, 0.51, 0.38, 1.04),
          duration: 0.5,
          delay: 1.75,
        }} */
      />
      <Image
        src={Hero01Img}
        alt="two people smiling"
        className="object-cover object-right-top aspect-[21/9]"
      />
    </div>
  );
};

export default ClipPathImage;
