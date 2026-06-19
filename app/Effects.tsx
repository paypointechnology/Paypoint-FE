"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __inViewIO?: IntersectionObserver;
    initInViewAnimations?: (selector?: string) => void;
  }
}

export default function Effects() {
  useEffect(() => {
    // --- In-view scroll animations (ported from source IIFE) ---
    const once = true;
    if (!window.__inViewIO) {
      window.__inViewIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              if (once) window.__inViewIO!.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );
    }
    window.initInViewAnimations = function (selector = ".animate-on-scroll") {
      document
        .querySelectorAll(selector)
        .forEach((el) => window.__inViewIO!.observe(el));
    };
    window.initInViewAnimations();
  }, []);

  return (
    <>
      {/* Technical Grid Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#14132b0a_1px,transparent_1px),linear-gradient(to_bottom,#14132b0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Secondary Faint Glow on Grid */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1/2 bg-gradient-to-b from-[#5F58F4]/10 to-transparent blur-3xl"></div>
      </div>
    </>
  );
}
