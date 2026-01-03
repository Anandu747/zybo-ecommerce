import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { orders } from "../purchase-product/route";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ orders });
}
