export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const name = cookieStore.get("user_name")?.value;

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
          px-[16px]
          sm:px-[24px]
          lg:px-[60px]
        "
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo (1).png"
            alt="Logo"
            width={52}
            height={52}
            priority
          />
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 sm:gap-6 text-white text-sm">
          {token && (
            <Link
              href="/profile"
              className="flex items-center gap-2 hover:opacity-80 max-w-[120px]"
            >
              <Image
                src="/Vector.png"
                alt="Profile"
                width={20}
                height={20}
              />

              {/* hide name on very small screens */}
              <span className="hidden sm:inline truncate">
                {name || "Profile"}
              </span>
            </Link>
          )}

          {token && (
            <Link
              href="/api/logout"
              className="hover:opacity-80 whitespace-nowrap"
            >
              Log Out
            </Link>
          )}

          {!token && (
            <Link
              href="/login"
              className="hover:opacity-80 whitespace-nowrap"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
