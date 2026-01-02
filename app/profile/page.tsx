import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const name = cookieStore.get("user_name")?.value;

  if (!token) redirect("/login");

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl mb-4">My Profile</h1>

      <p className="mb-6">
        Welcome, <span className="font-semibold">{name || "User"}</span>
      </p>

      <h2 className="text-lg mb-2">My Orders</h2>
      <p className="text-white/60">No orders yet</p>
    </div>
  );
}
