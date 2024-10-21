"use client";
import React, { useState } from "react";

// Next
import { usePathname } from "next/navigation";

// Component
import SidebarLink from "./SidebarLink";

// CSS
import styles from "./css/sidebar.module.css";

// Image

// Logo

// External
import { menuSlide } from "./anim";
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Home",

    href: "/",
  },

  {
    title: "Profile",

    href: "/profile",
  },

  {
    title: "Journal",

    href: "/journal",
  },

  {
    title: "Contact",

    href: "/contact",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`${styles.menu} z-[90]`}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>

          <div className="mt-[1.25rem]" />

          {navItems.map((data, index) => {
            return (
              <SidebarLink
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              />
            );
          })}
        </div>

        <div className="text-[0.6875rem] pt-6 uppercase border-t-[1px] border-[#999999] text-[#999999]">
          <p>Legal Information</p>
        </div>

        <div className={styles.footer}>
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Disclaimer</a>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
