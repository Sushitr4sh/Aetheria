"use client";

import React from "react";

// Next
import Link from "next/link";

// Component
import LogoReveal from "../utilities/logo-reveal";

// CSS

// Image

// Logo
import { Menu01Icon } from "hugeicons-react";

// External
import { easeInOut, motion } from "framer-motion";

const MainHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25, ease: easeInOut }}
      className="py-4 px-6 flex justify-between items-center"
    >
      <LogoReveal href="/" delay={1.5}>
        aetheria
      </LogoReveal>
      {/* Make this another component later! */}
      <nav className="flex items-center gap-x-6">
        <button className="font-medium text-lg border-b border-black pb-0 leading-5">
          Get in touch
        </button>
        <button className="bg-[#4734f7] p-2 rounded-full">
          <Menu01Icon size={20} color="#ffffff" />
        </button>
      </nav>
    </motion.header>
  );
};

export default MainHeader;
