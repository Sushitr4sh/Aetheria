"use client";

import React from "react";

import { motion, cubicBezier } from "framer-motion";

const ClipPathImage = ({ backgroundImage }: { backgroundImage: string }) => {
  return (
    <motion.div
      initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      className="bg-cover my-2 aspect-[21/9] w-[70%]"
      transition={{
        ease: cubicBezier(0.98, 0.51, 0.38, 1.04),
        duration: 0.5,
        /* ease: "circInOut", */
        delay: 1.75,
      }}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    ></motion.div>
  );
};

export default ClipPathImage;
