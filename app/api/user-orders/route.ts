import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // ✅ MUST await
  const token = cookieStore.get("access_token");

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    orders: [
      {
        id: "ORD202512270001",
        product: "Nike Air Max 90",
        amount: 899,
        status: "Paid",
      },
    ],
  });
}
