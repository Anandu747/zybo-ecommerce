import Image from "next/image";

const Navbar = () => {
  return (
    <header className="w-full bg-[#191919]">
      <div
        className="
          max-w-[1440px]
          h-[70px]
          mx-auto
          flex
          items-center
          justify-between
          py-[8px]
          px-4
          sm:px-6
          md:px-[60px]
        "
      >
        {/* Left Logo */}
        <div className="flex items-center">
          <Image
            src="/logo (1).png"
            alt="Logo"
            width={52}
            height={52}
            priority
          />
        </div>

        {/* Right Logout */}
        <div
          className="
            flex
            items-center
            cursor-pointer
            w-[95px]
            h-[24px]
            gap-4
            text-white
            text-sm
          "
        >
          <Image src="/vector.png" alt="Logout" width={19.5} height={19.5} />
          <span
            className="
          
    w-[55px]
    h-[20px]
    font-inter
    text-[15px]
    leading-[19.16px]
    tracking-[-0.03em]
    text-center
    text-white
  
          
          "
          >
            Log Out
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
