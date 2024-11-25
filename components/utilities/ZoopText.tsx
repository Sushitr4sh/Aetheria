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
  // Split text into words
  const words = children.split(" ");

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="relative block overflow-hidden text-6xl sm:text-7xl lg:text-8xl font-medium"
      style={{ lineHeight: 1.125 }}
    >
      <div className="flex flex-wrap">
        {words.map((word, index) => (
          <div key={index} className="relative overflow-hidden mr-[0.3em] mb-2">
            <motion.p
              variants={{
                initial: { y: "100%" },
                animate: { y: 0 },
              }}
              transition={{
                ease: cubicBezier(0.98, 0.51, 0.38, 1.04),
                duration: 1,
                delay: delay + index * 0.5, // Stagger animation for each word
              }}
            >
              {word}
            </motion.p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ZoopText;
