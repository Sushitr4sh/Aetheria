"use client";
import React, { useState } from "react";

import SidebarLink from "./sidebar-link";

import { menuSlide } from "./anim";

import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import styles from "./sidebar.module.css";

const navItems = [
  {
    title: "Home",

    href: "/",
  },

  {
    title: "Journal",

    href: "/journal",
  },

  {
    title: "Profile",

    href: "/profile",
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
      className={styles.menu}
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

        <div className="text-[11px] uppercase pt-[30px] border-t-[1px] border-[#999999] text-[#999999] mt-48">
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
