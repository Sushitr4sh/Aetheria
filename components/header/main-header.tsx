"use client";

import React from "react";

// Next
import Link from "next/link";

// Component
import LogoReveal from "../utilities/logo-reveal";

// CSS

// Image

// Logo

// External
import { easeInOut, motion } from "framer-motion";

interface MainHeaderProps {
  isActive: boolean;
  onMenuClick: (active: boolean) => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ isActive, onMenuClick }) => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.175, delay: 0.25, ease: easeInOut }}
      className="py-4 px-6 flex justify-between items-center z-50"
    >
      <LogoReveal href="/" delay={1.5}>
        aetheria
      </LogoReveal>
      {/* Make this another component later! */}
      <nav className="flex items-center gap-x-6">
        <motion.div
          variants={textVariant}
          initial={false}
          animate={isActive ? "open" : "close"}
        >
          <Link
            href="#"
            className="font-medium text-lg border-b-2 border-black pb-0 leading-6"
          >
            Get in touch
          </Link>
        </motion.div>
        <motion.button
          onClick={() => onMenuClick(!isActive)}
          variants={backgroundVariant}
          initial={false}
          animate={isActive ? "open" : "close"}
          className="flex flex-col space-y-[2px] items-center justify-center w-9 h-9 rounded-full p-2 focus:outline-none"
        >
          <motion.span
            variants={topBarVariant}
            initial={false}
            animate={isActive ? "open" : "close"}
            className="w-full h-[2px]"
          />
          <motion.span
            variants={middleBarVariant}
            initial={false}
            animate={isActive ? "open" : "close"}
            className="w-full h-[2px]"
          />
          <motion.span
            variants={bottomBarVariant}
            initial={false}
            animate={isActive ? "open" : "close"}
            className="w-full h-[2px]"
          />
        </motion.button>
      </nav>
    </motion.header>
  );
};

export default MainHeader;

const textVariant = {
  open: {
    opacity: 0,
    transition: {
      duration: 0.175,
    },
  },
  close: {
    opacity: 1,
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};

const backgroundVariant = {
  open: {
    backgroundColor: "#FFFFFF",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
  close: {
    backgroundColor: "#4734f7",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};

const topBarVariant = {
  open: {
    rotate: 45,
    y: 4,
    backgroundColor: "#000000",
    transition: {
      duration: 0.25,
      easeInOut,
    },
  },
  close: {
    rotate: 0,
    y: 0,
    backgroundColor: "#FFFFFF",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};

const middleBarVariant = {
  open: {
    opacity: 0,
    transition: {
      duration: 0.175,
    },
  },
  close: {
    opacity: 1,
    backgroundColor: "#FFFFFF",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};

const bottomBarVariant = {
  open: {
    rotate: -45,
    y: -4,
    backgroundColor: "#000000",
    transition: {
      duration: 0.25,
      easeInOut,
    },
  },
  close: {
    rotate: 0,
    y: 0,
    backgroundColor: "#FFFFFF",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};
