// app/api/verify/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone_number } = await req.json();

  const isExistingUser = phone_number === "9876543210";

  return NextResponse.json({
    otp: isExistingUser ? "1234" : "5678",
    user: isExistingUser,
    token: isExistingUser
      ? { access: "jwt_access_token_here" }
      : undefined,
  });
}
