import React from "react";

import Link from "next/link";

import { GoogleGeminiIcon } from "hugeicons-react";

const ChatbotMenu = () => {
  return (
    <section className="px-6 mb-4 w-full fixed bottom-0 hidden lg:block">
      <div className="bg-[#1f1f1f]/25 rounded-[28px] text-xl w-full flex justify-between items-center p-[12px] pl-8 text-white ">
        <Link href="/what-we-do">What we do</Link>
        <Link href="/who-we-are" className="opacity-25">
          Who we are
        </Link>
        <div className="flex items-center gap-x-2 bg-[#1f1f1f] p-4 rounded-[16px] text-sm">
          Talk to us.. <GoogleGeminiIcon size={24} />
        </div>
      </div>
    </section>
  );
};

export default ChatbotMenu;
