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
  delay: number;
}) => {
  return (
    <motion.article
      className="absolute px-6 pb-6 bottom-0 text-lg w-full font-medium leading-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
        ease: easeInOut,
        delay,
      }}
    >
      {children}
    </motion.article>
  );
};

export default FadeInText;
