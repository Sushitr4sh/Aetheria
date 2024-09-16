"use client";
import React, { FormEvent, useState } from "react";

// Next

// Component
import MainHeader from "@/components/header/main-header";

// CSS

// Image

// Logo
import { GoogleGeminiIcon } from "hugeicons-react";

// External

interface ChatMessage {
  prompt: string;
  response: string;
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
  return (
    <>
      <MainHeader />
      <main className="px-6 max-h-[80dvh]">
        {chatHistory.length > 0 &&
          chatHistory.map((chat, index) => (
            <div key={index}>
              <div className="flex flex-col gap-y-2">
                <p>You:</p> <p>{chat.prompt}</p>
              </div>
              <div className="flex flex-col mt-6 gap-y-2">
                <GoogleGeminiIcon size={32} color="#4d85d2" fill="#4d85d2" />
                <p>{chat.response}</p>
              </div>
            </div>
          ))}
      </main>
      <form
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
      </form>
    </>
  );
};

export default Chat;
