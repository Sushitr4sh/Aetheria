"use client";
import React, { useState, useEffect } from "react";

// Next
import Link from "next/link";

// Component
import MainHeader from "@/components/header/MainHeader";
import Sidebar from "@/components/header/Sidebar";
import ZoopText from "@/components/utilities/ZoopText";
import FadeInText from "@/components/utilities/FadeInText";

// Logo
import { ArrowLeft02Icon } from "hugeicons-react";

// External
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const LegalInformation = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeSection, setActiveSection] = useState("privacy");

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <section className="flex flex-col w-full pb-6">
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      <article className="px-6 mt-28 md:px-32 lg:px-64">
        <Link
          href="/"
          className="flex items-center gap-x-2 text-[#4734f7] mb-4"
        >
          <ArrowLeft02Icon />
          Back to Home
        </Link>
        <h2 className="mb-6">
          <ZoopText delay={0.25}>Legal Information</ZoopText>
        </h2>
        <FadeInText delay={1}>
          Important legal information about Aetheria, your mental health
          journaling companion.
        </FadeInText>

        <div className="border-t-[1px] border-[#999999] mt-6" />

        {/* Navigation Tabs */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setActiveSection("privacy")}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              activeSection === "privacy"
                ? "bg-[#4734f7] text-white"
                : "bg-gray-200"
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveSection("terms")}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              activeSection === "terms"
                ? "bg-[#4734f7] text-white"
                : "bg-gray-200"
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveSection("disclaimer")}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              activeSection === "disclaimer"
                ? "bg-[#4734f7] text-white"
                : "bg-gray-200"
            }`}
          >
            Disclaimer
          </button>
        </div>

        {/* Content Sections */}
        <AnimatePresence>
          <div className="mt-8">
            {activeSection === "privacy" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold">Privacy Policy</h3>
                <p className="text-lg">
                  Last updated: {new Date().toLocaleDateString()}
                </p>

                <div className="space-y-4">
                  <section>
                    <h4 className="text-xl font-semibold">
                      Information We Collect
                    </h4>
                    <p>We collect the following types of information:</p>
                    <ul className="list-disc ml-6 mt-2">
                      <li>Account information (email, name)</li>
                      <li>Journal entries and associated mood data</li>
                      <li>Usage data to improve our services</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-xl font-semibold">
                      How We Use Your Information
                    </h4>
                    <p>Your information is used to:</p>
                    <ul className="list-disc ml-6 mt-2">
                      <li>Provide and improve our journaling services</li>
                      <li>Generate AI-powered mood insights</li>
                      <li>Research and analyze usage patterns (anonymized)</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-xl font-semibold">Data Security</h4>
                    <p>
                      We implement security measures to protect your personal
                      information and journal entries. Your data is encrypted
                      and stored securely.
                    </p>
                  </section>
                </div>
              </motion.div>
            )}

            {activeSection === "terms" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold">Terms of Service</h3>
                <p className="text-lg">
                  Last updated: {new Date().toLocaleDateString()}
                </p>

                <div className="space-y-4">
                  <section>
                    <h4 className="text-xl font-semibold">
                      Acceptance of Terms
                    </h4>
                    <p>
                      By accessing and using Aetheria, you agree to these terms
                      and conditions. This is a thesis project and should be
                      used accordingly.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xl font-semibold">
                      User Responsibilities
                    </h4>
                    <ul className="list-disc ml-6 mt-2">
                      <li>Maintain the confidentiality of your account</li>
                      <li>Use the service responsibly and legally</li>
                      <li>Provide accurate information</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-xl font-semibold">
                      Service Modifications
                    </h4>
                    <p>
                      We reserve the right to modify or discontinue the service
                      at any time, as this is a thesis project.
                    </p>
                  </section>
                </div>
              </motion.div>
            )}

            {activeSection === "disclaimer" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold">Disclaimer</h3>
                <p className="text-lg">
                  Last updated: {new Date().toLocaleDateString()}
                </p>

                <div className="space-y-4">
                  <section>
                    <h4 className="text-xl font-semibold">Academic Purpose</h4>
                    <p>
                      Aetheria is a thesis project developed for academic
                      purposes. While we strive to provide helpful services, it
                      should not be considered a substitute for professional
                      mental health care.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xl font-semibold">
                      AI-Generated Content
                    </h4>
                    <p>
                      The mood analysis and recommendations provided by our AI
                      system are experimental and should be used for reference
                      only.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xl font-semibold">
                      Not Medical Advice
                    </h4>
                    <p>
                      The content and features provided by Aetheria do not
                      constitute medical advice, diagnosis, or treatment. Always
                      seek the advice of qualified mental health professionals
                      for any mental health concerns.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xl font-semibold">
                      Limitation of Liability
                    </h4>
                    <p>
                      As a thesis project, we provide this service "as is"
                      without any warranties. We are not liable for any damages
                      arising from the use of this service.
                    </p>
                  </section>
                </div>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </article>
    </section>
  );
};

export default LegalInformation;
