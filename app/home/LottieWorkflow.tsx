"use client";
import { useEffect, useRef } from "react";

export const LottieWorkflow = () => {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    if (typeof window !== "undefined") {
      // Load lottie-player web component once
      const hasPlayer = document.querySelector('script[data-lottie-player]');
      if (!hasPlayer) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
        script.async = true;
        script.setAttribute("data-lottie-player", "true");
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full flex items-center justify-center" style={{ maxWidth: 640 }}>
        {/* Background geometric shapes */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {/* Top-left soft circle */}
          <div
            className="absolute hidden sm:block"
            style={{
              top: -40,
              left: -40,
              width: 320,
              height: 320,
              borderRadius: "50%",
              backgroundColor: "#28584c",
              opacity: 0.06,
              filter: "blur(6px)",
            }}
          />
          {/* Bottom-right rotated square */}
          <div
            className="absolute hidden md:block"
            style={{
              bottom: -30,
              right: -30,
              width: 220,
              height: 220,
              backgroundColor: "#2f6d5e",
              opacity: 0.08,
              transform: "rotate(30deg)",
              borderRadius: 24,
              filter: "blur(2px)",
            }}
          />
          {/* Center-right gradient blob */}
          <div
            className="absolute hidden lg:block"
            style={{
              top: 40,
              right: 40,
              width: 320,
              height: 160,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #28584c 0%, #347164 60%, #6aa396 100%)",
              opacity: 0.07,
              filter: "blur(8px)",
            }}
          />
        </div>

        {/* lottie-player web component, loaded via CDN above */}
        {/* @ts-expect-error - custom element provided at runtime */}
        <lottie-player
          src="/assets/workflow.json"
          autoplay
          loop
          mode="normal"
          style={{ width: "100%", maxWidth: 560, height: "auto", zIndex: 10 }}
        />
      </div>
    </div>
  );
};


