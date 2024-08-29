import React from "react";

import { GoogleGeminiIcon } from "hugeicons-react";

const StickySidebar = () => {
  return (
    <section className="fixed flex items-center -right-8 top-[60%] transform -translate-y-[60%] my-auto -rotate-90 leading-3 px-3 bg-[#1f1f1f]/75 text-white py-1 border rounded-tl-xl rounded-tr-xl">
      Luna <GoogleGeminiIcon size={18} className="ml-2" />
    </section>
  );
};

export default StickySidebar;
