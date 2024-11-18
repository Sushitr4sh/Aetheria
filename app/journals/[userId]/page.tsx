"use client";
import React, { useState, useEffect } from "react";

// Next
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Component
import MainHeader from "@/components/header/MainHeader";
import Sidebar from "@/components/header/Sidebar";
import ZoopText from "@/components/utilities/ZoopText";
import FadeInText from "@/components/utilities/FadeInText";
import RadarChart from "@/components/utilities/RadarChart";
import LoadingResponse from "@/components/loading/LoadingResponse";
import Carousel from "@/components/utilities/Slider";

// CSS
import "react-calendar/dist/Calendar.css";

// Image

// Logo
import { GoogleGeminiIcon } from "hugeicons-react";
import { ArrowRight01Icon } from "hugeicons-react";

// External
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

interface Journal {
  _id: string;
  entryText: string;
  createdAt: string;
  moodData: number[];
}

const MyJournal = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  /* Sidebar */
  const [isMenuActive, setIsMenuActive] = useState(false);

  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJournals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/journals/${userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setJournals(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch journals.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJournals();
  }, [userId]);

  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleToggleReadMore = (id: string) => {
    // Toggle the expansion state for the clicked card
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getMoodEmote = (moodData: number[]): string => {
    const maxValue = Math.max(...moodData);
    const index = moodData.indexOf(maxValue);
    switch (index) {
      case 0:
        return "😀"; // Happiness
      case 1:
        return "😭"; // Sadness
      case 2:
        return "🤢"; // Disgust
      case 3:
        return "😱"; // Fear
      case 4:
        return "😮"; // Surprise
      case 5:
        return "😡"; // Anger
      default:
        return "";
    }
  };
  return (
    <section className="flex flex-col w-full pb-6">
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      <article className="px-6 mt-28">
        <h2 className="md:hidden mb-6">
          <ZoopText delay={0.25}>My Journals</ZoopText>
        </h2>
        <FadeInText delay={1}>
          My Journals is your personal space in Aetheria to document your
          thoughts, explore your emotions, and gain AI-powered insights into
          your mood.
        </FadeInText>
        <div className="border-t-[1px] border-[#999999] mt-6" />
      </article>
      <div className="mt-8 px-6 flex flex-col gap-y-2">
        {journals.map((journal) => {
          const createdAt = new Date(journal.createdAt);
          const date = createdAt.toLocaleDateString();
          const time = createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <motion.div
              key={journal._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="block bg-white p-4 rounded-lg shadow-md transition-shadow duration-300 border border-gray-300">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-800">
                      {date}
                    </p>
                    <p className="text-sm text-gray-500">{time}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">
                      {getMoodEmote(journal.moodData)}
                      {getMoodEmote(journal.moodData)}
                      {getMoodEmote(journal.moodData)}
                      {getMoodEmote(journal.moodData)}
                    </span>
                    <Link href={"/"} className="font-medium text-[#4734f7]">
                      See Details
                    </Link>
                  </div>
                </div>

                <p className="mt-2">
                  {expandedCard === journal._id ? (
                    journal.entryText // Full text when expanded
                  ) : (
                    <>
                      {journal.entryText.length > 100
                        ? journal.entryText.slice(0, 100) + "..."
                        : journal.entryText}
                      {journal.entryText.length > 100 && (
                        <span
                          onClick={() => handleToggleReadMore(journal._id)}
                          className="text-blue-500 cursor-pointer"
                        >
                          {" read more"}
                        </span>
                      )}
                    </>
                  )}
                </p>

                {expandedCard === journal._id && (
                  <span
                    onClick={() => handleToggleReadMore(journal._id)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {" show less"}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MyJournal;
