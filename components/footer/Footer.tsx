import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-black flex justify-center">
      {/* OUTER FOOTER */}
      <div
        className="
          w-[1440px]
          h-[244px]
          px-[100px]
          py-[64px]
          flex
          items-center
        "
      >
        {/* INNER LAYOUT (1240 x 56) */}
        <div
          className="
            w-[1240px]
            h-[56px]
            flex
            items-center
            justify-between
          "
        >
          {/* Left: Nike Logo */}
          <Image
            src="/logo (1).png"
            alt="Nike"
            width={106}
            height={56}
          />

          {/* Right: Social Icons */}
          <div
  className="
    flex
    items-center
    w-[151.53px]
    h-[22.6px]
    gap-[44.29px]
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
