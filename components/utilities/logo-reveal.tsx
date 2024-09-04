"use client";

import { useState } from "react";
import { motion, easeInOut } from "framer-motion";

const DURATION = 0.5;
const STAGGER = 0.0525;

type LogoReveal = {
  children: string;
  href: string;
  delay: number;
};

const LogoReveal = ({ children, href, delay }: LogoReveal) => {
  const letters = children.split("");
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.a
      href={href}
      initial="initial"
      animate="animate"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap font-bold text-3xl"
      style={{ lineHeight: 1.125 }}
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
    >
      <div>
        {letters.map((l, i) => {
          if (i === 0) {
            // First letter's animation
            return (
              <motion.span
                className="inline-block"
                variants={{
                  initial: { x: "300%" },
                  animate: { x: 0 },
                  hovered: { x: "300%" },
                }}
                transition={{
                  ease: easeInOut,
                  duration: DURATION,
                  delay,
                }}
                key={i}
              >
                {l}
              </motion.span>
            );
          }
          // Rest of the letters' animation
          return (
            <motion.span
              className="inline-block"
              variants={{
                initial: { y: "100%" },
                animate: { y: 0 },
                hovered: { y: "100%" },
              }}
              transition={{
                ease: easeInOut,
                duration: DURATION,
                // Reverse the stagger delay for hover: start from the rightmost letter
                delay: STAGGER * i + delay, // reverse staggering for hover
              }}
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.a>
  );
};

export default LogoReveal;
