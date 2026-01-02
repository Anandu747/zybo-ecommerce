import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    products: [
      {
        id: "PROD001",
        name: "Nike Air Max 90",
        price: 1200,
        variations: [
          { color: "Green", size: "UK 7" },
          { color: "Black", size: "UK 8" },
        ],
      },
    ],
  });
}
