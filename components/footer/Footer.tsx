import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-black flex justify-center">
      {/* OUTER */}
      <div
        className="
          w-full
          max-w-[1440px]
          px-[16px]
          sm:px-[24px]
          lg:px-[60px]
          py-[48px]
          lg:py-[64px]
        "
      >
        {/* INNER */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-[32px]
          "
        >
          {/* LOGO */}
          <Image
            src="/logo (1).png"
            alt="Nike"
            width={106}
            height={56}
            priority
          />

          {/* SOCIAL ICONS */}
          <div
            className="
              flex
              items-center
              gap-[32px]
            "
          >
            <Image
              src="/gg_facebook.png"
              alt="Facebook"
              width={22}
              height={22}
            />
            <Image
              src="/Vector (1).png"
              alt="Instagram"
              width={22}
              height={22}
            />
            <Image
              src="/Group.png"
              alt="X"
              width={22}
              height={22}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
