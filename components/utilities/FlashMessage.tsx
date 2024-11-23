import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlashMessageProps {
  type: "success" | "error";
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({
  type,
  message,
  isVisible,
  onClose,
}) => {
  // Auto-hide the message after 3 seconds
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[200]"
        >
          <div
            className={`px-6 py-3 rounded-lg font-semibold text-white shadow-lg ${
              type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlashMessage;
