"use client";
import React, { useState } from "react";

// Next
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

// Component
import SidebarLink from "./SidebarLink";

// CSS
import styles from "./css/sidebar.module.css";

// Image

// Logo

// External
import { menuSlide } from "./anim";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

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
      title: "Journals",
      href: `/journals/${userId}`,
    },
    {
      title: "Tutorial",
      href: "/tutorial",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`${styles.menu} z-[90] sm:max-w-96`}
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
          <Link href="/legal-information">Privacy Policy</Link>
          <Link href="/legal-information">Terms of Service</Link>
          <Link href="/legal-information">Disclaimer</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
