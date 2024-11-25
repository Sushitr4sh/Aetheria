import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PersistentFlashMessageProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const PersistentFlashMessage: React.FC<PersistentFlashMessageProps> = ({
  children,
  isVisible,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            exit: { duration: 0 }, // Immediate exit
          }}
          className="fixed top-20 w-full flex justify-center z-[200]"
        >
          <div className="px-6 py-3 rounded-lg bg-blue-500 text-white shadow-lg flex items-center gap-4">
            <span className="font-semibold">{children}</span>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-white text-blue-500 rounded hover:bg-blue-50 transition-colors"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PersistentFlashMessage;
