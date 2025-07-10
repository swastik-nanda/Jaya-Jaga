import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="
    fixed bottom-6 right-6 z-50
    bg-none border-3 border-amber-500 rounded-full p-3
    cursor-pointer outline-none
    flex items-center justify-center text-amber-500 hover:scale-105 hover:transition-all hover:duration-300
  "
    >
      <ArrowUp
        className="hover: scale-105 transition-all duration-300"
        size={32}
        strokeWidth={2.5}
      />
    </button>
  ) : null;
};

export default ScrollUpButton;
