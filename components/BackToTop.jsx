"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 flex items-center justify-center"
          aria-label="Back to top"
          title="Back to top"
        >
          <Image
            src={assets.arrow_icon_white}
            alt="arrow up"
            className="w-5 h-5 -rotate-90"
          />
        </button>
      )}
    </>
  );
};

export default BackToTop;
