"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";

const SIZES = [7, 8, 9, 10];

export default function ProductCard({ product }: any) {
  const imageRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [activeColor, setActiveColor] = useState(
    product.colors.find((c: any) => c.id === product.defaultColor)
  );
  const [activeSize, setActiveSize] = useState<number | null>(null);

  const onEnter = () => {
    tl.current?.kill();

    tl.current = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.current
      // SAME image moves up + shrinks
      .to(imageRef.current, {
        y: -40,
        scale: 0.9,
        duration: 0.35,
      })
      // Controls come from bottom
      .to(
        controlsRef.current,
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.3,
        },
        "-=0.2"
      );
  };

  const onLeave = () => {
    tl.current?.kill();

    tl.current = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.current
      .to(controlsRef.current, {
        opacity: 0,
        y: 24,
        pointerEvents: "none",
        duration: 0.25,
      })
      .to(
        imageRef.current,
        {
          y: 0,
          scale: 1,
          duration: 0.3,
        },
        "-=0.15"
      );
  };

  return (
    <div
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="
        w-[312px]
        h-[405px]
        bg-[#1E1E1E]
        rounded-[16px]
        relative
        overflow-hidden
        cursor-pointer
      "
    >
      {/* Background Circle */}
      <div
        className="absolute -top-[40px] left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full transition-colors duration-300"
        style={{ backgroundColor: activeColor.bg }}
      />

      {/* IMAGE (ONLY ONE IMAGE) */}
      <div
        ref={imageRef}
        className="relative z-10 flex justify-center pt-[40px]"
      >
        <Image
          src={activeColor.image}
          alt={product.name}
          width={260}
          height={260}
          className="object-contain"
        />
      </div>

      {/* Hover Controls (same card, bottom) */}
      <div
        ref={controlsRef}
        className="
          absolute
          bottom-[20px]
          left-[20px]
          right-[20px]
          opacity-0
          translate-y-[24px]
          pointer-events-none
          z-20
          flex
          flex-col
          gap-[12px]
        "
      >
        {/* Size */}
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">SIZE:</span>
          <div className="flex gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setActiveSize(size)}
                className={`w-[32px] h-[28px] rounded text-sm ${
                  activeSize === size
                    ? "bg-white text-black"
                    : "bg-white/20 text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">COLOR:</span>
          <div className="flex gap-2">
            {product.colors.map((color: any) => (
              <button
                key={color.id}
                onClick={() => setActiveColor(color)}
                className={`w-[18px] h-[18px] rounded-full border-2 ${
                  activeColor.id === color.id
                    ? "border-white"
                    : "border-white/40"
                }`}
                style={{ backgroundColor: color.bg }}
              />
            ))}
          </div>
        </div>

        {/* Buy */}
        <button className="h-[40px] bg-white text-black rounded font-semibold">
          Buy Now
        </button>
      </div>
    </div>
  );
}
