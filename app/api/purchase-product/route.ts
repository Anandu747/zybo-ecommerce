import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { product_id, variation_product_id } = body;

  if (!product_id && !variation_product_id) {
    return NextResponse.json(
      { message: "Product ID required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Order created successfully",
    order: {
      id: "ORD202512270001",
      total_amount: 899,
      payment_status: "Paid",
    },
  });
}
