import React from "react";

// Next
import Link from "next/link";
import CustomLink from "../transition/CustomLink";

// Component

// CSS
import styles from "./css/sidebar-link.module.css";

// Image

// Logo

// External
import { motion } from "framer-motion";
import { slide, scale } from "./anim";

interface SidebarLinkProps {
  data: { title: string; href: string; index: number };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  data,
  isActive,
  setSelectedIndicator,
}) => {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      ></motion.div>
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};

export default SidebarLink;
