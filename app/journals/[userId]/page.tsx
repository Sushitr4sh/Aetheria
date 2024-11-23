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
import FlashMessage from "@/components/utilities/FlashMessage";

// CSS
import "react-calendar/dist/Calendar.css";

// Image

// Logo
import { PlusSignIcon } from "hugeicons-react";

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
  const { data: session, status } = useSession();

  // State hooks
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Flash Message State
  const [flashMessage, setFlashMessage] = useState({
    type: "success" as "success" | "error",
    message: "",
    isVisible: false,
  });

  const handleToggleReadMore = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const [showMore, setShowMore] = useState<{ [date: string]: boolean }>({});

  // Fetch userId safely after session is available
  const userId = session?.user ? (session.user as { id: string }).id : null;

  // Check for flash message in sessionStorage on component mount
  useEffect(() => {
    const storedMessage = sessionStorage.getItem("flashMessage");
    if (storedMessage) {
      const { type, message } = JSON.parse(storedMessage);
      setFlashMessage({
        type,
        message,
        isVisible: true,
      });
      sessionStorage.removeItem("flashMessage");
    }
  }, []);

  const handleCloseFlash = () => {
    setFlashMessage((prev) => ({ ...prev, isVisible: false }));
  };

  // Scroll animation effect
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // Fetch journals when userId changes
  useEffect(() => {
    if (!userId) return;

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

  // Group journals by date
  const groupedJournals: { [date: string]: Journal[] } = journals.reduce(
    (acc: { [date: string]: Journal[] }, journal: Journal) => {
      const date = new Date(journal.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(journal);
      return acc;
    },
    {}
  );

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

  // Render logic
  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  if (!session) {
    return <div>No session found. Please log in.</div>;
  }

  // Sort dates in descending order (newest first)
  const sortedDates = Object.entries(groupedJournals).sort((a, b) => {
    const dateA = new Date(a[0]).getTime();
    const dateB = new Date(b[0]).getTime();
    return dateB - dateA;
  });

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
      <Link
        href="/journals/new"
        className="ml-6 mt-4 px-4 py-1 rounded-lg text-white font-semibold bg-[#4734f7] self-start flex items-center gap-x-1"
      >
        Create Journal
        <PlusSignIcon width={15} height={15} strokeWidth={4} />
      </Link>
      {journals.length === 0 && (
        <p className="ml-6 mt-4">You don't have any journal yet</p>
      )}
      <div className="mt-8 px-6">
        {sortedDates.map(([date, journals]) => {
          // Determine the journals to display based on the showMore state
          const visibleJournals = showMore[date]
            ? journals
            : journals.slice(0, 2);

          return (
            <div key={date} className="flex flex-col gap-y-4">
              <h3 className="text-3xl font-bold text-gray-800 mt-4">{date}</h3>
              {visibleJournals.map((journal) => {
                const createdAt = new Date(journal.createdAt);
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
                          <p className="text-lg font-semibold text-gray-500">
                            {time}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm">
                            {getMoodEmote(journal.moodData)}
                            {getMoodEmote(journal.moodData)}
                            {getMoodEmote(journal.moodData)}
                            {getMoodEmote(journal.moodData)}
                          </span>
                          <Link
                            href={`/journals/${userId}/${journal._id}`}
                            className="font-medium text-[#4734f7]"
                          >
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
                                onClick={() =>
                                  handleToggleReadMore(journal._id)
                                }
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
              {/* Show More Button */}
              {journals.length > 2 && (
                <button
                  onClick={() =>
                    setShowMore((prev) => ({ ...prev, [date]: !prev[date] }))
                  }
                  className="text-blue-500 mt-2 self-start"
                >
                  {showMore[date] ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyJournal;
