import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, phone_number } = await req.json();

  const res = NextResponse.json({
    message: "Login Successful",
    name,
    phone_number,
  });

  // JWT (mock)
  res.cookies.set("access_token", "jwt_access_token_here", {
    httpOnly: true,
    path: "/",
  });

  // Store name for profile display (skill-test friendly)
  res.cookies.set("user_name", name, {
    httpOnly: false,
    path: "/",
  });

  return res;
}
