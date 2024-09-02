"use client";

import React from "react";

// Next
import Image, { StaticImageData } from "next/image";

// Component

// CSS

// Image

// Logo

// External
import { motion } from "framer-motion";

const ClipPathImage = ({
  backgroundImage,
  delay,
}: {
  backgroundImage: StaticImageData;
  delay: number;
}) => {
  return (
    <div className="relative w-[70%] md:w-[25%] overflow-hidden my-2">
      <motion.div
        className="bg-white w-full h-full z-10 absolute"
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        style={{ transition: "all ease-out 0.225s" }}
        transition={{ delay }}
        /* transition={{
          ease: cubicBezier(0.98, 0.51, 0.38, 1.04),
          duration: 0.5,
          delay: 1.75,
        }} */
      />
      <Image
        src={backgroundImage}
        alt="two people smiling"
        className="object-cover object-right-top aspect-[21/9]"
      />
    </div>
  );
};

export default ClipPathImage;
