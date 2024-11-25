"use client";

import React, { ReactNode } from "react";

// Next

// Component

// CSS

// Image

// Logo

// External
import { motion, cubicBezier, easeInOut } from "framer-motion";

const FadeInText = ({
  children,
  delay,
}: {
  children: string;
  delay?: number;
}) => {
  return (
    <motion.article
      className="text-lg sm:text-2xl lg:text-3xl w-full font-medium leading-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.55,
        ease: easeInOut,
        delay,
      }}
    >
      {children}
    </motion.article>
  );
};

export default FadeInText;
