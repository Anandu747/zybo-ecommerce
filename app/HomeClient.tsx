"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useOrderStore } from "@/lib/orderStore";

const SIZES = [7, 8, 9, 10];

const COLOR_IMAGE_MAP: Record<string, string> = {
  "#9ACD32": "/Property 1=Frame 541.png",
  "#8A2BE2": "/Property 1=Frame 543.png",
  "#8B0000": "/Component 28.png",
};

const COLORS = Object.keys(COLOR_IMAGE_MAP);

function AnimatedCard({ src }: { src: string }) {
  const router = useRouter();
  const imageRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [currentImage, setCurrentImage] = useState(src);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    if (!imageRef.current || !bottomRef.current) return;

    const isDesktop = window.innerWidth >= 1024;

    gsap.set(bottomRef.current, {
      y: isDesktop ? 20 : 0,
      opacity: isDesktop ? 0 : 1,
      pointerEvents: "auto",
    });

    tl.current = gsap.timeline({ paused: true });

    if (isDesktop) {
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
            duration: 0.3,
            ease: "power1.out",
          },
          "-=0.15"
        );
    }
  }, []);

  const onEnter = () => {
    if (window.innerWidth >= 1024) tl.current?.play();
  };

  const onLeave = () => {
    if (window.innerWidth >= 1024) tl.current?.reverse();
  };

  const addOrder = useOrderStore((s) => s.addOrder);

  function handleBuyNow() {
    if (!selectedSize || !activeColor) {
      alert("Select size and color");
      return;
    }

    const order = {
      id: "ORD" + Date.now(),
      product: "Nike Air Max 90",
      image: currentImage,
      size: selectedSize,
      color: activeColor,
      price: 899,
      status: "Paid",
    };

    addOrder(order);
    router.push(`/order-success?orderId=${order.id}`);
  }

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="
        relative
        w-full
        max-w-[312px]
        h-[380px]
        sm:h-[405px]
        bg-[#1c1c1c]
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <div ref={imageRef} className="w-full h-full relative overflow-hidden">
        <Image
          src={currentImage}
          alt="Product"
          fill
          className="
            object-cover
            object-top
            scale-[1.1]
            sm:scale-[1.15]
            -translate-y-[8px]
            sm:-translate-y-[12px]
          "
          priority
        />
      </div>

      {/* BOTTOM CONTENT */}
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
              onClick={() => setSelectedSize(s)}
              className={`w-[28px] h-[28px] rounded-md ${
                selectedSize === s
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
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
        <button
          onClick={handleBuyNow}
          className="w-full h-[40px] bg-white text-black rounded-lg font-medium"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full bg-[#161616] flex justify-center">
      <div
        className="
          w-full
          max-w-[1440px]
          px-[16px]
          sm:px-[24px]
          lg:px-[60px]
          pt-[40px]
          pb-[80px]
        "
      >
        <section className="flex flex-col gap-[40px] mt-[25px]">
          <h1 className="text-[32px] sm:text-[40px] text-white">
            Men’s Jordan Shoes
          </h1>

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-[24px]
          ">
            <AnimatedCard src="/Property 1=Frame 541.png" />
            <AnimatedCard src="/Property 1=Frame 543.png" />
            <AnimatedCard src="/Property 1=Frame 543.png" />
            <AnimatedCard src="/Component 28.png" />
            <AnimatedCard src="/Property 1=Frame 541.png" />
            <AnimatedCard src="/Property 1=Frame 542.png" />
            <AnimatedCard src="/Property 1=Frame 543.png" />
            <AnimatedCard src="/Component 28.png" />
          </div>
        </section>
      </div>
    </main>
  );
}
