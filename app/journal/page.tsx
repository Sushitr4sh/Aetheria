"use client";
import React, { useState, useEffect } from "react";

// Next
import { useSession } from "next-auth/react";

// Component
import MainHeader from "@/components/header/MainHeader";
import Sidebar from "@/components/header/Sidebar";
import ZoopText from "@/components/utilities/ZoopText";
import FadeInText from "@/components/utilities/FadeInText";
import RadarChart from "@/components/utilities/RadarChart";
import LoadingResponse from "@/components/loading/LoadingResponse";
import Carousel from "@/components/utilities/Slider";

// CSS

// Image

// Logo
import { GoogleGeminiIcon } from "hugeicons-react";

// External
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const Journal = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const [isMenuActive, setIsMenuActive] = useState(false);

  const [journal, setJournal] = useState({ entryText: "" });
  const [response, setResponse] = useState({
    moodData: [],
    recommendation: [],
    shortSummary: "",
    isJournal: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const saveJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!session || !session.user) {
        throw new Error("Session not found");
      }

      const userId = (session.user as { id: string }).id;
      const fetchResponse = await fetch("/api/journal/new", {
        method: "POST",
        body: JSON.stringify({
          userId,
          entryText: journal.entryText,
        }),
      });

      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`);
      }

      // Parse the JSON response
      const data = await fetchResponse.json();
      // Set the response state
      setResponse(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
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
          <ZoopText delay={0.25}>My Journal</ZoopText>
        </h2>
        <FadeInText delay={1}>
          My Journal is your private space in Aetheria to record your thoughts,
          reflect on your emotions, and uncover mood insights powered by AI.
        </FadeInText>

        <div className="border-t-[1px] border-[#999999] mt-6" />

        <form className="mt-6" onSubmit={saveJournal}>
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
        </form>
      </article>
      {submitting ? (
        <div className="mt-8">
          <LoadingResponse />
        </div>
      ) : response.moodData.length > 0 && response.isJournal === true ? (
        <div className="px-6 mt-8">
          <div className="flex gap-x-2">
            <GoogleGeminiIcon strokeWidth={2} />
            <p className="text-lg font-semibold">AI Generated:</p>
          </div>
          <p className="mt-2">{response.shortSummary}</p>
          <RadarChart moodData={response.moodData} />
          <p>To help improve your mood, consider these recommendations:</p>
          <div className="mt-4">
            <Carousel recommendation={response.recommendation} />
          </div>
        </div>
      ) : (
        response.isJournal === false && (
          <>
            <div className="flex gap-x-2 mt-4 px-6">
              <GoogleGeminiIcon strokeWidth={2} />
              <p className="text-lg font-semibold">AI Generated:</p>
            </div>
            <p className="mt-2 px-6 text-red-500">
              Please write a valid journal entry!
            </p>
          </>
        )
      )}
    </section>
  );
};

export default Journal;
