"use client";

import React, { ReactNode } from "react";

// Next

// Component

// CSS

// Image

// Logo

// External
import { motion, cubicBezier } from "framer-motion";

const FadeInText = ({ children }: { children: string }) => {
  return (
    <motion.article
      className="absolute px-6 pb-4 bottom-0 text-lg w-full font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: cubicBezier(0.98, 0.51, 0.38, 1.04),
        delay: 2.25,
      }}
    >
      {children}
    </motion.article>
  );
};

export default FadeInText;
