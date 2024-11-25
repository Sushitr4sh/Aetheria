"use client";
import React, { useState, useEffect, useRef } from "react";

// Next
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Components
import MainHeader from "@/components/header/MainHeader";
import Sidebar from "@/components/header/Sidebar";
import ZoopText from "@/components/utilities/ZoopText";
import FadeInText from "@/components/utilities/FadeInText";
import LoadingResponse from "@/components/loading/LoadingResponse";
import RadarChart from "@/components/utilities/RadarChart";
import Carousel from "@/components/utilities/Slider";
import FlashMessage from "@/components/utilities/FlashMessage";

// Icons
import { GoogleGeminiIcon } from "hugeicons-react";
import { ArrowLeft02Icon } from "hugeicons-react";

// Animation
import { motion, AnimatePresence } from "framer-motion";

interface JournalDetailProps {
  params: {
    userId: string;
    journalId: string;
  };
}

const JournalDetail = ({ params }: JournalDetailProps) => {
  const { userId, journalId } = params;
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* States */
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState({
    type: "success" as "success" | "error",
    message: "",
    isVisible: false,
  });
  const [journal, setJournal] = useState({
    entryText: "",
    moodData: [],
    recommendation: [],
    shortSummary: "",
    createdAt: "",
    updatedAt: "",
  });

  /* Functions */
  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(journal.entryText);
  };

  const handleCloseFlash = () => {
    setFlashMessage((prev) => ({ ...prev, isVisible: false }));
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this journal?")) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(
        `/api/journals/${userId}/details/${journalId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete journal");
      }

      sessionStorage.setItem(
        "flashMessage",
        JSON.stringify({
          type: "success",
          message: "Journal deleted successfully",
        })
      );

      router.push(`/journals/${userId}`);
    } catch (err) {
      console.error("Error deleting journal:", err);
      setFlashMessage({
        type: "error",
        message: "Failed to delete journal. Please try again.",
        isVisible: true,
      });
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Check if the text has actually changed
      if (editedText.trim() === journal.entryText.trim()) {
        setFlashMessage({
          type: "success",
          message: "No changes were made to the journal",
          isVisible: true,
        });
        setIsEditing(false);
        return;
      }

      // Check word count
      const wordCount = countWords(editedText);
      if (wordCount < 50) {
        setFlashMessage({
          type: "error",
          message: `Your journal entry needs at least 50 words. Current word count: ${wordCount}`,
          isVisible: true,
        });
        setIsSaving(false);
        return;
      }

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

      setFlashMessage({
        type: "success",
        message: "Journal updated successfully!",
        isVisible: true,
      });
    } catch (err) {
      console.error("Error updating journal:", err);
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

  /* Effects */
  useEffect(() => {
    const fetchJournal = async () => {
      if (!userId || !journalId) return;

      try {
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

  if (isLoading) return <LoadingResponse />;
  if (error) return <div>{error}</div>;

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
      <article className="px-6 mt-28 md:px-32 lg:px-64">
        <Link
          href={`/journals/${userId}`}
          className="flex items-center gap-x-2 text-[#4734f7] mb-4"
        >
          <ArrowLeft02Icon />
          Back to Journals
        </Link>
        <h2 className="mb-6">
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
              <>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 px-3 py-1 rounded-lg text-white"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Journal"}
                </button>
                <button
                  onClick={handleEdit}
                  className="bg-[#4734f7] px-3 py-1 rounded-lg text-white"
                >
                  Edit Journal
                </button>
              </>
            )}
          </div>
        </form>
      </article>
      <div className="px-6 mt-8 md:px-32 lg:px-64">
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
