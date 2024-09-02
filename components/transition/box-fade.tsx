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

export default BoxFade;
