"use client";

import { useOrderStore } from "@/lib/orderStore";

const getCurrentDateTime = () => {
  const now = new Date();
  return `${now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}, ${now.toLocaleDateString()}`;
};

export default function ProfilePage() {
  const orders = useOrderStore((s) => s.orders);

  return (
    <div className="
    pl-[80px]
    pr-[80px]
    pt-[32px]
    pb-[140px]
    text-white
    bg-[#1c1c1c]
    ">

      {/* CONTAINER */}
      <div
        className="
          w-[806px]
          h-[376px]
          flex
          flex-col
          gap-[48px]
        "
      >
        {/* Heading */}
        <h1
          className="
            w-[193px]
            h-[48px]
            text-[40px]
            font-semibold
            leading-[100%]
            tracking-[-0.03em]
            font-inter
          "
        >
          My Orders
        </h1>

        {orders.length === 0 && <p>No orders yet</p>}

        {orders.map((order) => (
          <div
            key={order.id}
            className="
              w-[806px]
              h-[128px]
              bg-[#1E1E1E]
              rounded-[12px]
              flex
              gap-[28px]
              pt-[16px]
              pr-[24px]
              pb-[16px]
              pl-[16px]
            "
          >
            {/* Image */}
            <img
              src={order.image}
              alt={order.product}
              className="w-[109px] h-[96px] object-cover rounded-[8px]"
            />

            {/* ✅ INSIDE CONTENT (PIXEL PERFECT) */}
            <div
              className="
                w-[628.388px]
                h-[86px]
                flex
                gap-[28px]
                items-center
              "
            >
              {/* LEFT CONTENT */}
              <div className="flex flex-col gap-[4px]">
                <p className="text-[16px] font-medium">
                  {order.product}
                </p>

                <p className="text-[12px] text-gray-400">
                  Size: {order.size} | Color: {order.color}
                </p>

                <p className="text-[12px] text-gray-500">
                  {getCurrentDateTime()}
                </p>
              </div>

              {/* ✅ PRICE SECTION – RIGHT ALIGNED */}
              <div className="ml-auto text-right">
                <p className="text-[16px] font-semibold">
                  ₹{order.price}
                </p>

                <p className="text-green-400 text-[12px]">
                  {order.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
