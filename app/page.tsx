"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const SIZES = [7, 8, 9, 10];

// ✅ color → image mapping
const COLOR_IMAGE_MAP: Record<string, string> = {
  "#9ACD32": "/Property 1=Frame 541.png",
  "#8A2BE2": "/Property 1=Frame 543.png",
  "#8B0000": "/component 28.png",
};

const COLORS = Object.keys(COLOR_IMAGE_MAP);

function AnimatedCard({ src }: { src: string }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [currentImage, setCurrentImage] = useState(src);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  // ✅ INITIAL SETUP (THIS FIXES YOUR ISSUE)
  useEffect(() => {
    if (!imageRef.current || !bottomRef.current) return;

    gsap.set(imageRef.current, {
      y: 0,
      paddingBottom: 0,
    });

    gsap.set(bottomRef.current, {
      y: 20,
      opacity: 0,
      pointerEvents: "none",
    });

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(imageRef.current, {
        y: -24,
        paddingBottom: 56,
        duration: 0.3,
        ease: "power1.out",
      })
      .to(
        bottomRef.current,
        {
          y: 0,
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "power1.out",
        },
        "-=0.15"
      );
  }, []);

  const onEnter = () => {
    tl.current?.play();
  };

  const onLeave = () => {
    tl.current?.reverse();
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative w-[312px] h-[405px] bg-[#1c1c1c] overflow-hidden"
    >
      {/* IMAGE */}
      <div
        ref={imageRef}
        className="w-full h-full flex items-center justify-center"
      >
        <Image
          key={currentImage}
          src={currentImage}
          alt="Product"
          width={312}
          height={405}
        />
      </div>

      {/* BOTTOM CONTENT (HIDDEN BY DEFAULT) */}
      <div
        ref={bottomRef}
        className="absolute bottom-[16px] left-0 w-full px-[20px]"
      >
        {/* SIZE */}
        <div className="flex items-center gap-2 mb-3 text-white">
          <span className="text-sm">SIZE:</span>
          {SIZES.map((s) => (
            <button
              key={s}
              className="w-[28px] h-[28px] bg-white text-black text-sm rounded-md"
            >
              {s}
            </button>
          ))}
        </div>

        {/* COLOR */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-white">COLOR:</span>
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setActiveColor(c);
                setCurrentImage(COLOR_IMAGE_MAP[c]);
              }}
              className={`w-[14px] h-[14px] rounded-full ${
                activeColor === c ? "ring-2 ring-white" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* BUTTON */}
        <button className="w-full h-[40px] bg-white rounded-lg font-medium">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full bg-[#161616] flex justify-center">
      <div className="w-[1440px] min-w-[1440px] px-[60px] pt-[40px] pb-[80px]">
        <section className="w-[1320px] flex flex-col gap-[40px] mt-[25px]">
          <h1 className="text-[40px] text-white">
            Men’s Jordan Shoes
          </h1>

          <div className="grid grid-cols-4 gap-[24px]">
            <AnimatedCard src="/Property 1=Frame 541.png" />
            <AnimatedCard src="/Property 1=Frame 543.png" />
            <AnimatedCard src="/Property 1=Frame 543.png" />
            <AnimatedCard src="/component 28.png" />

            <AnimatedCard src="/Property 1=Frame 541.png" />
            <AnimatedCard src="/Property 1=Frame 542.png" />
            <AnimatedCard src="/Property 1=Frame 543.png" />
            <AnimatedCard src="/component 28.png" />
          </div>
        </section>
      </div>
    </main>
  );
}
