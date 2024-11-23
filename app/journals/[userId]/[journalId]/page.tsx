"use client";
import React, { useState, useEffect, useRef } from "react";

// Next
import { useSession } from "next-auth/react";
import Link from "next/link";

import MainHeader from "@/components/header/MainHeader";
import Sidebar from "@/components/header/Sidebar";
import ZoopText from "@/components/utilities/ZoopText";
import FadeInText from "@/components/utilities/FadeInText";
import LoadingResponse from "@/components/loading/LoadingResponse";
import RadarChart from "@/components/utilities/RadarChart";
import Carousel from "@/components/utilities/Slider";
import FlashMessage from "@/components/utilities/FlashMessage";

import { GoogleGeminiIcon } from "hugeicons-react";
import { ArrowLeft02Icon } from "hugeicons-react";

import { motion, AnimatePresence } from "framer-motion";

interface JournalDetailProps {
  params: {
    userId: string;
    journalId: string;
  };
}

const JournalDetail = ({ params }: JournalDetailProps) => {
  const { userId, journalId } = params;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* Sidebar */
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Flash Message State
  const [flashMessage, setFlashMessage] = useState({
    type: "success" as "success" | "error",
    message: "",
    isVisible: false,
  });

  // State hooks
  const [journal, setJournal] = useState({
    entryText: "",
    moodData: [],
    recommendation: [],
    shortSummary: "",
    createdAt: "",
    updatedAt: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch journal details when component mounts
  useEffect(() => {
    const fetchJournal = async () => {
      if (!userId || !journalId) return;

      try {
        console.log(
          "Fetching journal for userId:",
          userId,
          "and journalId:",
          journalId
        );
        const response = await fetch(
          `/api/journals/${userId}/details/${journalId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setJournal(data);
        setEditedText(data.entryText);
      } catch (err: any) {
        setError(err.message || "Failed to fetch journal.");
        console.error("Error fetching journal:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJournal();
  }, [userId, journalId]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(journal.entryText);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Check if the text has actually changed
      if (editedText.trim() === journal.entryText.trim()) {
        // No changes made, just show success message and exit edit mode
        setFlashMessage({
          type: "success",
          message: "No changes were made to the journal",
          isVisible: true,
        });
        setIsEditing(false);
        return;
      }

      // Text has changed, proceed with API call
      const response = await fetch(
        `/api/journals/${userId}/details/${journalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ entryText: editedText }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update journal");
      }

      const updatedJournal = await response.json();
      setJournal(updatedJournal);
      setAnimationKey((prev) => prev + 1);

      // Show success message
      setFlashMessage({
        type: "success",
        message: "Journal updated successfully!",
        isVisible: true,
      });
    } catch (err) {
      console.error("Error updating journal:", err);
      // Show error message
      setFlashMessage({
        type: "error",
        message: "Failed to update journal. Please try again.",
        isVisible: true,
      });
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleCloseFlash = () => {
    setFlashMessage((prev) => ({ ...prev, isVisible: false }));
  };

  if (isLoading) {
    return <LoadingResponse />;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
          href={`/journals/${userId}`}
          className="flex items-center gap-x-2 text-[#4734f7] mb-4"
        >
          <ArrowLeft02Icon />
          Back to Journals
        </Link>
        <h2 className="md:hidden mb-6">
          <ZoopText delay={0.25}>My Journal</ZoopText>
        </h2>
        <FadeInText delay={1}>
          My Journal is your private space in Aetheria to record your thoughts,
          reflect on your emotions, and uncover mood insights powered by AI.
        </FadeInText>

        <div className="border-t-[1px] border-[#999999] mt-6" />

        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="entryText" className="block text-lg font-semibold">
            Your note at: <br /> {formatDateTime(journal.createdAt)}
          </label>
          <textarea
            ref={textareaRef}
            name="entryText"
            id="entryText"
            className="w-full p-[1rem] h-[6.25rem] border border-gray-300 mt-2 focus:outline-none focus:border-[#4734f7] transition duration-150 ease-in"
            placeholder="What's on your mind today? Anything you'd like to share? ..."
            style={{ resize: "none" }}
            value={isEditing ? editedText : journal.entryText}
            onChange={(e) => setEditedText(e.target.value)}
            readOnly={!isEditing}
            required
          ></textarea>
          <div className="flex w-full justify-end mt-2 gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 px-3 py-1 rounded-lg text-white"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#4734f7] px-3 py-1 rounded-lg text-white"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Journal"}
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-[#4734f7] px-3 py-1 rounded-lg text-white"
              >
                Edit Journal
              </button>
            )}
          </div>
        </form>
      </article>
      <div className="px-6 mt-8">
        <div className="flex gap-x-2">
          <GoogleGeminiIcon strokeWidth={2} />
          <motion.p
            key={`title-${animationKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold"
          >
            AI Generated:
          </motion.p>
        </div>
        <motion.p
          key={`summary-${animationKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-2"
        >
          {journal.shortSummary}
        </motion.p>
        <motion.div
          key={`chart-${animationKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <RadarChart moodData={journal.moodData} />
        </motion.div>
        <motion.p
          key={`rec-title-${animationKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          To help improve your mood, consider these recommendations:
        </motion.p>
        <motion.div
          key={`rec-${animationKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-4"
        >
          <Carousel recommendation={journal.recommendation} />
        </motion.div>
      </div>
    </section>
  );
};

export default JournalDetail;
