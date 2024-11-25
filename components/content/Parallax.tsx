"use client";
import React from "react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import BarChart from "../utilities/BarChart";
import Hero02Img from "../../public/images/hero02.jpg";
import Hero03Img from "../../public/images/hero03.jpg";
import InsightImg from "../../public/images/insight.jpg";
import SupportImg from "../../public/images/support.jpg";

const Parallax = () => {
  return (
    <section className="w-full bg-white relative mt-[100dvh] -z-40 pb-6 lg:pb-12">
      {/* Hero Section 1 */}
      <div className="mb-16 lg:mb-24">
        <div className="">
          <Image
            src={Hero02Img}
            alt="Mental health illustration"
            className="grayscale aspect-[5/4] lg:aspect-[16/9] object-cover w-full"
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12 mt-4">
          <div className="lg:max-w-4xl xl:max-w-6xl">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-semibold">
              Mental health is tough.
              <span className="block text-[#b3b3b3] mt-2">We know</span>
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-6 lg:px-12 mt-6 lg:mt-8">
          <div className="lg:max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeInOut }}
              className="text-lg lg:text-xl"
            >
              Generation Z is facing more stress than any other age group, with
              academic pressure, social media, and concerns about the future
              adding constant anxiety to their lives.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Hero Section 2 */}
      <div className="mb-16 lg:mb-24">
        <div className="">
          <Image
            src={Hero03Img}
            alt="Mental health illustration"
            className="aspect-[5/4] lg:aspect-[16/9] object-cover w-full"
          />
        </div>
        <div className="container flex justify-end px-6 lg:px-12 mt-4">
          <div className="lg:max-w-4xl xl:max-w-6xl">
            <h2 className="text-7xl lg:text-8xl xl:text-9xl font-semibold text-right uppercase">
              Crisis
            </h2>
          </div>
        </div>
        <div className="container mx-auto px-6 lg:px-12 mt-6 lg:mt-8">
          <div className="lg:max-w-2xl ml-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeInOut }}
              className="text-lg lg:text-xl text-right"
            >
              Unlike previous generations, Gen Z faces distinct challenges like
              constant digital connectivity, economic concerns, and social
              comparison, leading to higher rates of anxiety and depression.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="rounded-full border-b-2 border-[#b3b3b3] w-full" />
      </div>

      {/* Mental Health of Gen Z Section */}
      <div className="container mx-auto px-6 lg:px-12 mt-6 lg:mt-12 mb-4">
        <div className="lg:max-w-2xl">
          <h3 className="text-xl lg:text-2xl font-bold">
            Mental Health of Gen Z
          </h3>
          <p className="text-lg lg:text-xl mt-2">
            Compared with other generations, Gen Z is least likely to report
            very good or excellent mental health.
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="px-16 mt-8">
        <BarChart />
      </div>

      {/* Insights Section */}
      <div className="mt-12 mb-16 lg:mt-24 lg:mb-24">
        <div className="">
          <Image
            src={InsightImg}
            alt="Insights illustration"
            className="aspect-[5/4] lg:aspect-[16/9] object-cover w-full"
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:max-w-4xl xl:max-w-6xl">
            <h4 className="text-5xl lg:text-6xl xl:text-7xl font-semibold mt-6 lg:mt-8">
              Understanding the Impact
            </h4>
          </div>
        </div>
        <div className="container mx-auto px-6 lg:px-12 mt-6 lg:mt-8">
          <div className="lg:max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeInOut }}
              className="text-lg lg:text-xl"
            >
              Recent studies reveal that 70% of Gen Z experience significant
              stress on a daily basis, with academic, financial, and social
              challenges being the primary contributors. Many lack access to
              affordable mental health resources, leaving them struggling to
              navigate their emotions.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="mb-16 lg:mb-24">
        <div className="">
          <Image
            src={SupportImg}
            alt="Support illustration"
            className="aspect-[5/4] lg:aspect-[16/9] object-cover w-full"
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:max-w-4xl xl:max-w-6xl">
            <h5 className="text-6xl lg:text-7xl xl:text-8xl font-semibold mt-6 lg:mt-8">
              How Aetheria Helps
            </h5>
          </div>
        </div>
        <div className="container mx-auto px-6 lg:px-12 mt-6 lg:mt-8">
          <div className="lg:max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeInOut }}
              className="text-lg lg:text-xl"
            >
              Aetheria is designed to bridge the gap by providing a space for
              journaling, mood tracking, and personalized recommendations. Our
              AI-driven insights help users recognize their emotional patterns
              and take actionable steps toward better mental health.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="bg-[#f7f7f7] p-8 lg:p-12 text-center rounded-lg shadow-lg">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg lg:text-xl mb-6 lg:mb-8 max-w-2xl mx-auto">
            Discover how Aetheria can help you take control of your mental
            well-being, one day at a time.
          </p>
          <motion.button
            className="bg-[#4a90e2] text-white px-8 py-4 rounded-full text-lg lg:text-xl font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: easeInOut, duration: 0.3 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Parallax;
