"use client";
import React, { useState } from "react";

// Next
import Link from "next/link";

// Component
import MainHeader from "@/components/header/MainHeader";
import Sidebar from "@/components/header/Sidebar";
import ZoopText from "@/components/utilities/ZoopText";
import FadeInText from "@/components/utilities/FadeInText";
import FlashMessage from "@/components/utilities/FlashMessage";

// Logo
import { ArrowLeft02Icon } from "hugeicons-react";

// External
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  // Flash Message State
  const [flashMessage, setFlashMessage] = useState({
    type: "success" as "success" | "error",
    message: "",
    isVisible: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFlashMessage({
        type: "success",
        message: "Message sent successfully!",
        isVisible: true,
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setFlashMessage({
        type: "error",
        message: "Failed to send message. Please try again.",
        isVisible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseFlash = () => {
    setFlashMessage((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <section className="flex flex-col w-full pb-6">
      <FlashMessage
        type={flashMessage.type}
        message={flashMessage.message}
        isVisible={flashMessage.isVisible}
        onClose={handleCloseFlash}
      />
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      <article className="px-6 mt-28">
        <Link
          href="/"
          className="flex items-center gap-x-2 text-[#4734f7] mb-4"
        >
          <ArrowLeft02Icon />
          Back to Home
        </Link>
        <h2 className="md:hidden mb-6">
          <ZoopText delay={0.25}>Contact Us</ZoopText>
        </h2>
        <FadeInText delay={1}>
          Have questions or feedback? We'd love to hear from you. Send us a
          message and we'll respond as soon as possible.
        </FadeInText>

        <div className="border-t-[1px] border-[#999999] mt-6" />

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 2.25 }}
          className="mt-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-lg font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full p-[1rem] border border-gray-300 focus:outline-none focus:border-[#4734f7] transition duration-150 ease-in rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-[1rem] border border-gray-300 focus:outline-none focus:border-[#4734f7] transition duration-150 ease-in rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-lg font-semibold mb-2"
            >
              What can we help you with?
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full p-[1rem] h-[6.25rem] border border-gray-300 focus:outline-none focus:border-[#4734f7] transition duration-150 ease-in rounded-lg"
              style={{ resize: "none" }}
              required
            />
          </div>

          <div className="flex w-full justify-end mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#4734f7] px-6 py-2 rounded-lg text-white font-semibold"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </motion.form>
      </article>
    </section>
  );
};

export default Contact;
