"use client";
import React, { FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";

// Next

// Component
import MainHeader from "@/components/header/main-header";

// CSS

// Image

// Logo
import { GoogleGeminiIcon } from "hugeicons-react";

// External
import { motion, easeIn } from "framer-motion";

interface ChatMessage {
  prompt: string;
  response: string;
}

function formatTextToJSX(text: string): JSX.Element {
  // Split text into lines
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, index) => {
        // Check if the line is a heading (e.g., ## or ###)
        if (line.startsWith("##")) {
          return (
            <>
              <h2 key={index}>{line.replace(/^##\s*/, "")}</h2>
            </>
          );
        } else if (line.startsWith("* ")) {
          // Handle bullet points
          return (
            <ul key={index} className="list-disc list-inside">
              <li>{line.replace(/^\*\s*/, "")}</li>
            </ul>
          );
        } else if (line.startsWith("**")) {
          // Bold text within the line
          const boldText = line.match(/\*\*(.*?)\*\*/);
          if (boldText) {
            return (
              <p key={index}>
                <strong>{boldText[1]}</strong>
                {line.replace(`**${boldText[1]}**`, "")}
              </p>
            );
          }
        } else if (line.trim() !== "") {
          // Regular paragraph text
          return <p key={index}>{line}</p>;
        }
        // Return null for empty lines to avoid rendering them
        return null;
      })}
    </>
  );
}

const Chat = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPrompt("");
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { prompt, response: data.response },
      ]);
    } catch (error) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { prompt, response: "Failed to get response!" },
      ]);
    }
  };

  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <>
      <MainHeader isActive={isMenuActive} onMenuClick={setIsMenuActive} />

      <main className="px-6 max-h-[80dvh]">
        {chatHistory.length > 0 &&
          chatHistory.map((chat, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col gap-y-2">
                <p className="font-bold">You:</p> <p>{chat.prompt}</p>
              </div>
              <div className="flex flex-col mt-6 gap-y-2">
                <GoogleGeminiIcon size={32} color="#4d85d2" fill="#4d85d2" />
                <div>{chat.response}</div>
              </div>
            </div>
          ))}
      </main>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1, ease: easeIn }}
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full px-4 pb-2 pt-1 bg-white"
      >
        <input
          type="text"
          className="w-full py-4 px-6 text-xl rounded-full bg-[#f0f4f9] mb-2 focus:outline-none border border-gray-200 shadow-md"
          placeholder="Enter a prompt here"
          name="prompt"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <aside className="text-center px-4 text-xs text-gray-400 ">
          Luna may display inaccurate info, including about people, so
          double-check its responses.
        </aside>
      </motion.form>
    </>
  );
};

export default Chat;
