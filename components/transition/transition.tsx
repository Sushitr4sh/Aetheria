import React from "react";
import BoxFade from "./box-fade";

// Next

// Component

// CSS

// Image

// Logo

// External

const Transition = () => {
  return (
    <div className="absolute z-30 top-0 left-0 w-full h-[100dvh]">
      <div className="grid grid-cols-2 w-full h-[25vh]">
        <BoxFade />
        <BoxFade />
      </div>
      <div className="grid grid-cols-2 rotate-180 w-full h-[25vh]">
        <BoxFade />
        <BoxFade />
      </div>
      <div className="grid grid-cols-2 w-full h-[25vh]">
        <BoxFade />
        <BoxFade />
      </div>
      <div className="grid grid-cols-2 rotate-180 w-full h-[25vh]">
        <BoxFade />
        <BoxFade />
      </div>
    </div>
  );
};

export default Transition;
