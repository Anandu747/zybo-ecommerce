import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const name = cookieStore.get("user_name")?.value;

  return (
    <header className="w-full bg-[#191919]">
      <div className="max-w-[1440px] h-[70px] mx-auto flex items-center justify-between px-[60px]">
        
        {/* Logo */}
        {/* <Image src="/logo (1).png" alt="Logo" width={52} height={52} /> */}
        
<Link href="/" className="flex items-center">
  <Image
    src="/logo (1).png"
    alt="Logo"
    width={52}
    height={52}
    priority
  />
</Link>


        {/* Right */}
        <div className="flex items-center gap-6 text-white text-sm">

          {token && (
            <Link
              href="/profile"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Image src="/Vector.png" alt="Profile" width={20} height={20} />
              <span>{name || "Profile"}</span>
            </Link>
          )}

          {token && (
            <Link
              href="/api/logout"
              className="hover:opacity-80"
            >
              Log Out
            </Link>
          )}

          {!token && (
            <Link href="/login" className="hover:opacity-80">
              Login
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
