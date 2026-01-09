"use client";

export const dynamic = "force-dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useOrderStore } from "@/lib/orderStore";

const getCurrentDateTime = () => {
  const now = new Date();
  return `${now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}, ${now.toLocaleDateString()}`;
};

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const orders = useOrderStore((s) => s.orders);
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <p className="text-white text-center mt-20">
        Order not found
      </p>
    );
  }

  return (
    <main
      className="
        w-full
        min-h-[calc(100vh-70px)]
        bg-[#1c1c1c]
        flex
        items-center
        justify-center
      "
    >
      <div className="flex flex-col items-center gap-[12px] text-center">

        <Image
          src="/logo (1).png"
          alt="Success"
          width={106}
          height={56}
        />

        <h1 className="text-[36px] font-bold text-white">
          Successfully Ordered!
        </h1>

        {/* ✅ TIME */}
        <p className="text-gray-400 text-sm">
          {getCurrentDateTime()}
        </p>

        {/* ORDER CARD */}
        <div
          className="
            w-[548px]
            h-[128px]
            bg-[#1E1E1E]
            rounded-[12px]
            p-[16px]
            flex
            items-center
            gap-[28px]
            text-left
            mt-[14px]
          "
        >
          <div className="w-[109px] h-[96px] bg-[#2A2A2A] rounded-[8px] relative overflow-hidden">
            <Image
              src={order.image}
              alt="Product"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 text-white">
            <p className="font-medium">{order.product}</p>
            <p className="text-gray-400 text-sm">
              Order ID: {order.id}
            </p>
            <p className="text-gray-400 text-sm">
              Size: {order.size} | Color: {order.color}
            </p>
          </div>

          <div className="text-right text-white">
            <p className="font-semibold">₹{order.price}</p>
            <p className="text-green-400 text-sm">
              {order.status}
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
