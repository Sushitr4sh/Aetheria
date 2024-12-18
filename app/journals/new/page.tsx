"use client";
import React, { useState, useEffect } from "react";

// Next
import { useSession } from "next-auth/react";
import Link from "next/link";

// Component
import MainHeader from "@/components/header/MainHeader";
import Sidebar from "@/components/header/Sidebar";
import ZoopText from "@/components/utilities/ZoopText";
import FadeInText from "@/components/utilities/FadeInText";
import RadarChart from "@/components/utilities/RadarChart";
import LoadingResponse from "@/components/loading/LoadingResponse";
import Carousel from "@/components/utilities/Slider";
import FlashMessage from "@/components/utilities/FlashMessage";

// CSS
import "react-calendar/dist/Calendar.css";

// Logo
import { GoogleGeminiIcon } from "hugeicons-react";
import { ArrowRight01Icon, ArrowLeft02Icon } from "hugeicons-react";

// External
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import Calendar from "react-calendar";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Journal = () => {
  const { data: session } = useSession();
  const userId = session?.user ? (session.user as { id: string }).id : null;

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  /* States */
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [value, onChange] = useState<Value>(new Date());
  const [journal, setJournal] = useState({ entryText: "" });
  const [response, setResponse] = useState({
    moodData: [],
    recommendation: [],
    shortSummary: "",
    isJournal: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState({
    isVisible: false,
    type: "error" as "success" | "error",
    message: "",
  });

  /* Functions */
  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleFlashClose = () => {
    setFlashMessage((prev) => ({ ...prev, isVisible: false }));
  };

  const saveJournal = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check word count
    const wordCount = countWords(journal.entryText);
    if (wordCount < 50) {
      setFlashMessage({
        isVisible: true,
        type: "error",
        message: `Your journal entry needs at least 50 words. Current word count: ${wordCount}`,
      });
      return;
    }

    setSubmitting(true);
    setError(null); // Reset previous errors before the request

    try {
      if (!session || !session.user) {
        throw new Error("Session not found");
      }

      const userId = (session.user as { id: string }).id;
      const fetchResponse = await fetch("/api/journals/new", {
        method: "POST",
        body: JSON.stringify({
          userId,
          entryText: journal.entryText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!fetchResponse.ok) {
        const errorData = await fetchResponse.json();
        throw new Error(
          errorData.message || "An error occurred while saving the journal."
        );
      }

      const data = await fetchResponse.json();
      setResponse(data);

      // Show success message
      setFlashMessage({
        isVisible: true,
        type: "success",
        message: "Journal entry saved successfully!",
      });
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col w-full pb-6">
      <FlashMessage
        type={flashMessage.type}
        message={flashMessage.message}
        isVisible={flashMessage.isVisible}
        onClose={handleFlashClose}
      />
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      <article className="px-6 mt-28 md:px-32 lg:px-64">
        {userId && (
          <Link
            href={`/journals/${userId}`}
            className="flex items-center gap-x-2 text-[#4734f7] mb-4"
          >
            <ArrowLeft02Icon />
            Back to Journals
          </Link>
        )}
        <h2 className="mb-6">
          <ZoopText delay={0.25}>Write New Journal</ZoopText>
        </h2>
        <FadeInText delay={1}>
          Express yourself freely in this new journal entry. Our AI will analyze
          your emotions and provide personalized insights to help you understand
          your mood better.
        </FadeInText>

        <div className="border-t-[1px] border-[#999999] mt-6" />

        <div className="mt-3">
          <motion.button
            onClick={toggleCalendar}
            className="flex items-center px-4 py-2 bg-black/10 rounded-full hover:bg-black/15 focus:outline-none"
          >
            <span className="mr-2">Tips for Writing a Daily Journal?</span>

            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isCalendarVisible ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight01Icon size={20} />{" "}
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isCalendarVisible && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 overflow-hidden"
              >
                <div className="bg-white p-6 rounded-lg border border-[#ECECEC] mx-auto">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Tips for Writing a Meaningful Daily Journal
                  </h1>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="bg-purple-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-4 shrink-0 mt-2">
                        1
                      </span>
                      <div>
                        <p className="font-semibold">Be Honest and Authentic</p>
                        <p>
                          Write about your real feelings and experiences.
                          Journaling works best when you're truthful with
                          yourself. There's no need to embellish or
                          fabricate—this is your safe space.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-4 shrink-0 mt-2">
                        2
                      </span>
                      <div>
                        <p className="font-semibold">
                          Focus on Specific Events or Emotions
                        </p>
                        <p>
                          Instead of trying to capture your entire day, zoom in
                          on one or two specific moments that stood out. Reflect
                          on what you felt, why you felt it, and how it impacted
                          you.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-4 shrink-0 mt-2">
                        3
                      </span>
                      <div>
                        <p className="font-semibold">Embrace Your Emotions</p>
                        <p>
                          No emotion is too small or too big to write about.
                          Whether you're feeling excited, upset, or confused,
                          expressing it helps you process your thoughts.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-4 shrink-0 mt-2">
                        4
                      </span>
                      <div>
                        <p className="font-semibold">Add Depth</p>
                        <p>
                          Explore the "why" behind your feelings. For example,
                          if you felt proud, what made you feel that way? If you
                          felt scared, what triggered that reaction?
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-4 shrink-0 mt-2">
                        5
                      </span>
                      <div>
                        <p className="font-semibold">Write Freely</p>
                        <p>
                          Don't worry about grammar, spelling, or structure. Let
                          your thoughts flow naturally. This is about
                          self-expression, not perfection.
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className="border-t border-gray-200 mt-8 pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Example Journal Entry
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-bold">Date:</span> November 23,
                        2024
                      </p>
                      <p className="text-gray-700">
                        I can't believe the big presentation is tomorrow. My
                        stomach has been in knots all day just thinking about
                        it. I've prepared as much as I can, but there's still
                        this nagging worry about forgetting something important.
                      </p>
                      <p className="text-gray-700 mt-4">
                        At the same time, I feel a strange excitement. This is a
                        chance to showcase all the hard work I've put in over
                        the past few weeks. It's a little terrifying but also
                        thrilling.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 2.25 }}
          className="mt-6"
          onSubmit={saveJournal}
        >
          <label htmlFor="entryText" className="block text-lg font-semibold">
            Today's note:
          </label>
          <textarea
            name="entryText"
            id="extryText"
            className="w-full p-[1rem] h-[6.25rem] border border-gray-300 mt-2 focus:outline-none focus:border-[#4734f7] transition duration-150 ease-in"
            placeholder="What's on your mind today? Anything you'd like to share? ..."
            style={{ resize: "none" }}
            value={journal.entryText}
            onChange={(e) => setJournal({ entryText: e.target.value })}
            required
          ></textarea>
          <div className="flex w-full justify-end mt-2">
            <button className="bg-[#4734f7] px-3 py-1 rounded-lg text-white">
              {submitting ? "Saving..." : "Save Journal"}
            </button>
          </div>
        </motion.form>
      </article>
      {submitting ? (
        <div className="mt-8 md:px-32 lg:px-64">
          <LoadingResponse />
        </div>
      ) : (
        response.moodData.length > 0 &&
        response.isJournal === true && (
          <div className="px-6 mt-8 md:px-32 lg:px-64">
            <div className="flex gap-x-2">
              <GoogleGeminiIcon strokeWidth={2} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-semibold"
              >
                AI Generated:
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-2"
            >
              {response.shortSummary}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <RadarChart moodData={response.moodData} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              To help improve your mood, consider these recommendations:
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-4"
            >
              <Carousel recommendation={response.recommendation} />
            </motion.div>
          </div>
        )
      )}
      {error && (
        <>
          <div className="flex gap-x-2 mt-4 px-6 md:px-32 lg:px-64">
            <GoogleGeminiIcon strokeWidth={2} />
            <p className="text-lg font-semibold">AI Generated:</p>
          </div>
          <p className="mt-2 px-6 text-red-500 md:px-32 lg:px-64">
            Please write a valid journal entry!
          </p>
        </>
      )}
    </section>
  );
};

export default Journal;
