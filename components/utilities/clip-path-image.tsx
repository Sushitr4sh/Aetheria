"use client";

import React, { FC } from "react";

// Next
import Image, { StaticImageData } from "next/image";

// Component

// CSS

// Image

// Logo

// External
import { motion } from "framer-motion";

interface ClipPathImageProps {
  backgroundImage: StaticImageData;
  delay: number;
}

const ClipPathImage: FC<ClipPathImageProps> = ({ backgroundImage, delay }) => {
  return (
    <div className="relative w-[70%] md:w-[25%] overflow-hidden my-2">
      <motion.div
        className="bg-white w-full h-full z-10 absolute"
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        style={{ transition: "all ease-out 0.225s" }}
        transition={{ delay }}
      />
      <Image
        src={backgroundImage}
        alt="two people smiling"
        className="object-cover object-right-top aspect-[21/9]"
        priority
      />
    </div>
  );
};

export default ClipPathImage;
