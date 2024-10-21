"use client";

import React from "react";

// Next

// Component

// CSS

// Image

// Logo

// External
import { motion, cubicBezier } from "framer-motion";

const ZoopText = ({ children, delay }: { children: string; delay: number }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="relative block overflow-hidden whitespace-nowrap text-6xl md:text-7xl font-medium"
      style={{ lineHeight: 1.125 }}
    >
      <motion.p
        variants={{
          initial: { y: "100%" },
          animate: { y: 0 },
        }}
        transition={{
          ease: cubicBezier(0.98, 0.51, 0.38, 1.04),
          duration: 1,
          /* ease: "circInOut", */
          delay,
        }}
      >
        {children}
      </motion.p>
    </motion.div>
  );
};

export default ZoopText;
