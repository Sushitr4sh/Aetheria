"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const LoadingResponse = () => {
  const pending = useFormStatus();
  return (
    <div className="flex h-32 gap-4 p-5 fade-in-25 md:gap-6">
      <div className="size-9 shrink-0 rounded-full bg-gray-100"></div>
      <div className="flex w-full max-w-3xl flex-col gap-4 rounded-lg pt-2">
        <div className="h-5 w-10/12 origin-left animate-loading bg-[length:200%] rounded-sm bg-gradient-to-r from-blue-50 from-30% via-blue-600/60 to-blue-50 bg-2x opacity-0"></div>
        <div className="h-5 w-full origin-left animate-loading bg-[length:200%] rounded-sm bg-gradient-to-r from-blue-500/60 via-slate-100 via-30% to-blue-500/60 to-60% bg-2x opacity-0 "></div>
        <div className="duration-600 h-5 w-3/5 origin-left animate-loading bg-[length:200%] rounded-sm bg-gradient-to-r from-blue-50 from-40% via-blue-500/60 to-blue-50 to-70% bg-2x opacity-0 "></div>
      </div>
    </div>
  );
};

export default LoadingResponse;
