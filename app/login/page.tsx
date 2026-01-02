import Image from "next/image";

export default function Page() {
  return (
    <main className="w-full bg-black flex justify-center">
      {/* LOGIN FRAME */}
      <div className="w-[1440px] min-h-[871px] flex bg-black overflow-hidden">
        
        {/* LEFT IMAGE SECTION */}
        <div className="relative w-[720px] h-[871px] flex-shrink-0">
          <Image
            src="/Frame 530.png"
            alt="Nike Basketball"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* RIGHT LOGIN SECTION (FIXED) */}
        <div
          className="
            w-[720px]
            h-[871px]
            flex
            flex-col
            px-[60px]
            py-[100px]
            gap-[56px]
            bg-black
          "
        >
          {/* Title */}
          <h1 className="text-white text-[24px] font-semibold text-center">
            Log In
          </h1>

          {/* Phone Input */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-white text-[14px]">
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter Phone"
              className="
                h-[48px]
                rounded-[8px]
                bg-[#1E1E1E]
                px-[16px]
                text-white
                border border-white/10
                outline-none
                focus:border-white/40
              "
            />
          </div>

          {/* Continue Button */}
          <button
            className="
              h-[48px]
              bg-white
              text-black
              rounded-[8px]
              font-semibold
              hover:bg-gray-100
              transition
            "
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
