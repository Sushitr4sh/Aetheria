"use client";
import React from "react";

// Next
import Image from "next/image";

// Component

// CSS

// Image
import Hero02Img from "@/public/images/hero02.jpg";
import Hero03Img from "@/public/images/hero03.jpg";
import InsightImg from "@/public/images/insight.jpg";
import SupportImg from "@/public/images/support.jpg";

// Logo

// External
import { easeInOut, motion } from "framer-motion";
import BarChart from "../utilities/BarChart";

const Parallax = () => {
  return (
    <section className="w-full bg-white relative mt-[100dvh] -z-40 pb-6">
      <div className="mb-16">
        <Image
          src={Hero02Img}
          alt="Mental health illustration"
          className="grayscale aspect-[5/4] object-cover"
        />
        <div className="p-6 text-6xl font-semibold">
          <p>Mental health is tough.</p>
          <p className="text-[#b3b3b3] mt-2">We know</p>
        </div>
        <div className="px-6 text-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeInOut }}
          >
            Generation Z is facing more stress than any other age group, with
            academic pressure, social media, and concerns about the future
            adding constant anxiety to their lives.
          </motion.p>
        </div>
      </div>
      <div className="mb-6">
        <Image
          src={Hero03Img}
          alt="Mental health illustration"
          className="aspect-[5/4] object-cover"
        />
        <div className="p-6 text-8xl font-semibold">
          <p className="uppercase text-right">Crisis</p>
        </div>
        <div className="px-6 text-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeInOut }}
            className="text-right"
          >
            Unlike previous generations, Gen Z faces distinct challenges like
            constant digital connectivity, economic concerns, and social
            comparison, leading to higher rates of anxiety and depression.
          </motion.p>
        </div>
      </div>
      <div className="px-6">
        <div className="rounded-full border-b-2 border-[#b3b3b3] w-full" />
      </div>
      <div className="mt-6 mb-4 px-6">
        <p className="text-xl font-bold">Mental Health of Gen Z</p>
        <p className="text-lg">
          Compared with other generations, Gen Z is least likely to report very
          good or excellent mental health.
        </p>
      </div>
      <BarChart />
      <div className="mt-12 mb-16">
        <Image
          src={InsightImg}
          alt="Insights illustration"
          className="aspect-[5/4] object-cover"
        />
        <div className="p-6 text-5xl font-semibold">
          <p>Understanding the Impact</p>
        </div>
        <div className="px-6 text-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeInOut }}
          >
            Recent studies reveal that 70% of Gen Z experience significant
            stress on a daily basis, with academic, financial, and social
            challenges being the primary contributors. Many lack access to
            affordable mental health resources, leaving them struggling to
            navigate their emotions.
          </motion.p>
        </div>
      </div>

      {/* Solution Section */}
      <div className="mb-16">
        <Image
          src={SupportImg}
          alt="Support illustration"
          className="aspect-[5/4] object-cover"
        />
        <div className="p-6 text-7xl font-semibold">
          <p>How Aetheria Helps</p>
        </div>
        <div className="px-6 text-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeInOut }}
          >
            Aetheria is designed to bridge the gap by providing a space for
            journaling, mood tracking, and personalized recommendations. Our
            AI-driven insights help users recognize their emotional patterns and
            take actionable steps toward better mental health.
          </motion.p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#f7f7f7] p-8 text-center rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg mb-6">
          Discover how Aetheria can help you take control of your mental
          well-being, one day at a time.
        </p>
        <motion.button
          className="bg-[#4a90e2] text-white px-6 py-3 rounded-full text-lg font-bold"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ ease: easeInOut, duration: 0.3 }}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Parallax;
