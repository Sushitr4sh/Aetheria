import React from "react";

// Next

// Component
import MainHeader from "@/components/header/main-header";

// CSS

// Image

// Logo

// External
import generateResponse from "./vertexAi";

async function getChatbotResonse() {
  const response = await generateResponse(
    "Menurut mu, apa itu kesehatan mental?"
  );
  console.log(response);
}
getChatbotResonse();

const Chat = () => {
  return (
    <>
      <MainHeader />
      <form
        action="/chat"
        method="post"
        className="fixed bottom-0 w-full px-4 py-2"
      >
        <input
          type="text"
          className="w-full py-5 px-6 text-xl rounded-full bg-[#f0f4f9] mb-2 focus:outline-none border border-gray-200 shadow-md"
          placeholder="Enter a prompt here"
        />
        <aside className="text-center px-4 text-sm text-gray-400 ">
          Luna may display inaccurate info, including about people, so
          double-check its responses.
        </aside>
      </form>
    </>
  );
};

export default Chat;
