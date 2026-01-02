import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    orderId?: string;
    amount?: string;
    status?: string;
  };
};

export default async function OrderSuccessPage({ searchParams }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  // Protect page
  if (!token) redirect("/login");

  const { orderId, amount, status } = searchParams;

  return (
    <main className="w-full h-[calc(100vh-70px)] bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-[20px]">

        {/* ICON */}
        <Image
          src="/nike-tick.png"
          alt="Success"
          width={56}
          height={56}
        />

        {/* TITLE */}
        <h1 className="text-white text-[28px] font-semibold">
          Successfully Ordered!
        </h1>

        {/* DATE */}
        <p className="text-gray-400 text-sm">
          {new Date().toLocaleString()}
        </p>

        {/* ORDER CARD */}
        <div className="w-[420px] bg-[#1E1E1E] rounded-[12px] px-4 py-3 flex items-center gap-4">

          {/* PRODUCT IMAGE */}
          <div className="w-[60px] h-[60px] rounded-[8px] bg-[#2A2A2A] flex items-center justify-center">
            <Image
              src="/Property 1=Frame 541.png"
              alt="Product"
              width={48}
              height={48}
            />
          </div>

          {/* DETAILS */}
          <div className="flex-1 text-white">
            <p className="font-medium">Nike Air Max 90</p>
            <p className="text-xs text-gray-400">
              Order ID: {orderId}
            </p>
          </div>

          {/* PRICE */}
          <div className="text-right text-white">
            <p className="font-semibold">₹{amount}</p>
            <p className="text-xs text-green-400">{status}</p>
          </div>

        </div>
      </div>
    </main>
  );
}
