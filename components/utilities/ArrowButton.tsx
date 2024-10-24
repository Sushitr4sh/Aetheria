import React from "react";

// Next

// Component

// CSS

// Image

// Logo
import { ArrowRight02Icon } from "hugeicons-react";

// External

const ArrowButton = ({
  number,
  children,
}: {
  number: string;
  children: string;
}) => {
  return (
    <div className="w-full flex items-center justify-between text-lg py-3 border-t border-gray-300">
      <div className="flex gap-x-6 items-center">
        <p className="text-[#7a7a7a]">{number}</p>
        <p className="">{children}</p>
      </div>
      <ArrowRight02Icon />
    </div>
  );
};

export default ArrowButton;
