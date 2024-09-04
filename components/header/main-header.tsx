import React from "react";

// Next
import Link from "next/link";

// Component
import LogoReveal from "../utilities/logo-reveal";

// CSS

// Image

// Logo
import { Menu01Icon } from "hugeicons-react";

// External

const MainHeader = () => {
  return (
    <header className="py-4 px-6 flex justify-between items-center">
      <LogoReveal href="/" delay={1.5}>
        aetheria
      </LogoReveal>
      {/* Make this another component later! */}
      <nav className="flex items-center gap-x-6">
        <button className="font-medium text-lg border-b border-black pb-0 leading-5">
          Get in touch
        </button>
        <button className="bg-[#4734f7] p-2 rounded-full">
          <Menu01Icon size={20} color="#ffffff" />
        </button>
      </nav>
    </header>
  );
};

export default MainHeader;
