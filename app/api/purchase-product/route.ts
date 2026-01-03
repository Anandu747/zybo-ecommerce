import { NextResponse } from "next/server";
import { cookies } from "next/headers";

let orders: any[] = [];

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const newOrder = {
    id: "ORD" + Date.now(),
    product: "Nike Air Max 90",
    size: body.size,
    color: body.color,
    total_amount: body.price,
    payment_status: "Paid",
  };

  orders.push(newOrder);

  return NextResponse.json({
    message: "Order created successfully",
    order: newOrder,
  });
}

export { orders };
