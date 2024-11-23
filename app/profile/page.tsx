"use client";
import React, { useState, useEffect } from "react";

// Next
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

// Component
import MainHeader from "@/components/header/MainHeader";
import Sidebar from "@/components/header/Sidebar";

// CSS

// Image

// Logo

// External
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import ZoopText from "@/components/utilities/ZoopText";
import FadeInText from "@/components/utilities/FadeInText";
import RadarChart from "@/components/utilities/RadarChart";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Journal = {
  _id: string;
  creator: string;
  entryText: string;
  moodData: number[];
  recommendation: string[];
  shortSummary: string;
  isJournal: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Profile = () => {
  const { data: session, status } = useSession(); // Track session status
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageMoodData, setAverageMoodData] = useState<number[]>([]);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [progressSummary, setProgressSummary] = useState<string>("");

  const chartData = React.useMemo(() => {
    const labels = journals.map((journal) =>
      new Date(journal.createdAt).toLocaleDateString()
    );

    const emotionSeries: number[][] = Array.from({ length: 6 }, () => []);

    journals.forEach((journal) => {
      journal.moodData.forEach((value, index) => {
        emotionSeries[index].push(value); // No more TypeScript error
      });
    });

    return {
      labels,
      datasets: [
        {
          label: "Happiness",
          data: emotionSeries[0],
          borderColor: "rgba(75,192,192,1)",
          fill: false,
        },
        {
          label: "Sadness",
          data: emotionSeries[1],
          borderColor: "rgba(153,102,255,1)",
          fill: false,
        },
        {
          label: "Disgust",
          data: emotionSeries[2],
          borderColor: "rgba(255,159,64,1)",
          fill: false,
        },
        {
          label: "Fear",
          data: emotionSeries[3],
          borderColor: "rgba(255,99,132,1)",
          fill: false,
        },
        {
          label: "Surprise",
          data: emotionSeries[4],
          borderColor: "rgba(54,162,235,1)",
          fill: false,
        },
        {
          label: "Anger",
          data: emotionSeries[5],
          borderColor: "rgba(255,206,86,1)",
          fill: false,
        },
      ],
    };
  }, [journals]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        display: false,
        grid: { drawTicks: false, drawBorder: false },
      },
      y: {
        grid: { drawTicks: true, drawBorder: false },
      },
    },
  };

  // Fetch journals only when session is fully loaded and userId exists
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const userId = (session.user as { id: string }).id;

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

          // Calculate the average of moodData for each index
          const moodDataLength = data[0]?.moodData.length || 0;
          const summedMoodData = new Array(moodDataLength).fill(0);

          data.forEach((journal: Journal) => {
            journal.moodData.forEach((mood, index) => {
              summedMoodData[index] += mood;
            });
          });

          const averages = summedMoodData.map((sum) => sum / data.length);
          setAverageMoodData(averages);
        } catch (err: any) {
          setError(err.message || "Failed to fetch journals.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchJournals();
    }
  }, [session, status]); // Ensure the hook runs when session or status changes

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user &&
      chartData.datasets.length > 0
    ) {
      const fetchProgressSummary = async () => {
        try {
          const response = await fetch("/api/journals/summary", {
            method: "POST",
            body: JSON.stringify({
              moodData: chartData, // Send average mood data
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = await response.json();
          setProgressSummary(data.summary);
        } catch (err: any) {
          setError(err.message || "Failed to fetch progress summary.");
        }
      };

      fetchProgressSummary();
    }
  }, [averageMoodData, status, session]);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Clean up Lenis
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  if (!session) {
    return <div>No session found. Please log in.</div>;
  }
  return (
    <section className="flex flex-col w-full h-[100dvh]">
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />
      <AnimatePresence mode="wait">
        {isMenuActive && <Sidebar />}
      </AnimatePresence>
      <article className="px-6 mt-28">
        <div className="md:hidden">
          <ZoopText delay={0.25}>My Profile</ZoopText>
        </div>
        <div className="w-full mt-24 relative">
          <div className="border-t-[1px] border-[#999999]" />
          <Image
            src={session?.user.image || "/images/no-user.jpg"}
            alt="Profile picture"
            width={120}
            height={120}
            className="rounded-full absolute left-8 -top-[60px]"
          />
        </div>
        <div className="flex gap-x-4 mt-20 items-center w-full">
          <div className="mb-1">
            <p className="text-3xl">{session?.user.name}</p>
            <p className="text-gray-400">{session?.user.email}</p>
          </div>
          <div className="flex flex-grow justify-center">
            <button
              type="button"
              onClick={handleSignOut}
              className="text-lg px-6 py-1 text-[#f73434] border border-[#f73434] rounded-full shrink-0"
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="mt-4 mb-8 flex flex-col gap-y-4">
          <div>
            <p className="text-xl font-semibold">Mood Progress:</p>
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="mt-4">
            <p className="font-semibold mb-1">Summary:</p>
            {progressSummary}
          </div>
          <div>
            <p className="text-xl font-semibold mt-4">Your Average Mood:</p>
            <RadarChart moodData={averageMoodData} />
          </div>
        </div>
      </article>
      <div className="absolute px-6 pb-6 bottom-0 hidden">
        <FadeInText delay={2.25}>
          Your Aetheria profile is your personal space to track moods, journal,
          and explore AI tools for mental well-being.
        </FadeInText>
      </div>
    </section>
  );
};

export default Profile;
