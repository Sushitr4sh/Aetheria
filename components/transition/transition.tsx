"use client";
import React from "react";

// Next

// Component

// CSS

// Image

// Logo

// External
import { motion, easeIn } from "framer-motion";
const BoxFade = () => {
  return (
    <motion.div
      initial={{ width: "100%" }}
      animate={{ width: "0%" }}
      transition={{ duration: 0.5, ease: easeIn }}
      className="h-full bg-[#eeecee]"
    />
  );
};

const Transition = () => {
  return (
    <div className="absolute z-30 top-0 left-0 w-full h-[100dvh]">
      <div className="grid grid-cols-2 w-full h-[25vh]">
        <BoxFade />
        <BoxFade />
      </div>
      <div className="grid grid-cols-2 rotate-180 w-full h-[25vh]">
        <BoxFade />
        <BoxFade />
      </div>
      <div className="grid grid-cols-2 w-full h-[25vh]">
        <BoxFade />
        <BoxFade />
      </div>
      <div className="grid grid-cols-2 rotate-180 w-full h-[25vh]">
        <BoxFade />
        <BoxFade />
      </div>
    </div>
  );
};

export default Transition;
