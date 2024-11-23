"use client";
import React from "react";
import { motion, easeInOut, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const BoxFade = () => {
  return (
    <motion.div
      initial={{ width: "100%" }}
      animate={{ width: "0%" }}
      exit={{ width: "100%" }}
      transition={{
        duration: 0.75,
        ease: easeInOut,
      }}
      className="h-full bg-[#eeecee]"
    />
  );
};

const Transition = () => {
  const pathname = usePathname();

  return (
    <div
      data-transition="overlay"
      className="fixed z-[9999] top-0 left-0 w-full h-[100dvh] pointer-events-none"
    >
      <AnimatePresence mode="wait" initial={true}>
        <motion.div key={pathname} className="w-full h-full">
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;
