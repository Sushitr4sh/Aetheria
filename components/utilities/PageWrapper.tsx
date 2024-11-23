"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.75 }}
    >
      {children}
    </motion.main>
  );
}
