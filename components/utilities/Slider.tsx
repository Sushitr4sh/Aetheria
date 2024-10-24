"use client";
import React, { useState } from "react";

const Carousel = ({ recommendation }: { recommendation: string[] }) => {
  return (
    <div className="relative">
      <div className="overflow-x-auto flex snap-x snap-mandatory scrollbar-hide space-x-2">
        {recommendation.map((item, index) => (
          <div
            key={index}
            className={`snap-center shrink-0 w-[80vw] flex items-center justify-center overflow-hidden bg-gray-200 p-4 rounded-xl`}
            // Set selected item on click
          >
            <div className="">
              <span className="font-bold">#{index + 1}.</span> {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
