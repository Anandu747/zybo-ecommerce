// app/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const cookieStore = await cookies();   // ✅ await required
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/login");
  }

  return <HomeClient />;
}
