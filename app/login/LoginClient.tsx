"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "PHONE" | "OTP" | "NAME";

export default function LoginClient() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("PHONE");
  const [phone, setPhone] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [name, setName] = useState("");

  // STEP 1 – Verify phone
  async function handlePhoneSubmit() {
  const res = await fetch("/api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({ phone_number: phone }),
  });

  const data = await res.json();

  console.log("SERVER OTP:", data.otp); 

  setServerOtp(String(data.otp));    
  setIsExistingUser(data.user);
  setStep("OTP");
}
  // STEP 2 – Verify OTP
  function handleOtpVerify() {
  const enteredOtp = otpDigits.join("");

  console.log("ENTERED OTP:", enteredOtp);
  console.log("SERVER OTP:", serverOtp);

  if (enteredOtp.trim() !== serverOtp.trim()) {
    alert("Invalid OTP");
    return;
  }

  if (isExistingUser) {
    router.push("/");
  } else {
    setStep("NAME");
  }
}


  // STEP 3 – Register new user
  async function handleRegister() {
    await fetch("/api/login-register", {
      method: "POST",
      body: JSON.stringify({
        name,
        phone_number: phone,
      }),
    });

    router.push("/");
  }

  function handleOtpChange(value: string, index: number) {
  if (!/^\d?$/.test(value)) return;

  const newOtp = [...otpDigits];
  newOtp[index] = value;
  setOtpDigits(newOtp);

  if (value && index < 3) {
    const next = document.getElementById(`otp-${index + 1}`);
    next?.focus();
  }
}

function handleOtpKeyDown(
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
) {
  if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
    const prev = document.getElementById(`otp-${index - 1}`);
    prev?.focus();
  }
}


  return (
    <main className="w-screen min-h-screen bg-black">
      <div className="flex">

        {/* LEFT IMAGE */}
        <div className="relative w-[720px] h-[871px]">
          <Image
            src="/Frame 530.png"
            alt="Login Visual"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[720px] h-[871px] px-[60px] py-[100px] flex flex-col gap-[56px]">

          {step === "PHONE" && (
            <>
              <h1 className="text-white text-[24px] text-center">Log In</h1>

              <input
  type="tel"
  placeholder="Enter Phone"
  onChange={(e) => setPhone(e.target.value)}
  className="
    w-[600px]
    h-[56px]
    bg-[#1E1E1E]
    text-white
    px-[16px]
    py-[10px]
    rounded-[12px]
    outline-none
    placeholder:text-white/40
  "
/>


              <button
  onClick={handlePhoneSubmit}
  className="
    w-[600px]
    h-[56px]
    bg-white
    text-black
    px-[16px]
    py-[10px]
    rounded-[12px]
    font-semibold
    flex
    items-center
    justify-center
    gap-[10px]
    transition
    hover:bg-gray-100
    active:scale-[0.99]
  "
>
  Continue
</button>

            </>
          )}

          {step === "OTP" && (
            <>
              <h1 className="text-white text-[24px] text-center">
                Verify Phone
              </h1>

              <p className="text-center text-gray-400 text-sm">
              Enter the OTP sent to {phone}
              </p>
              <div className="flex justify-center gap-[12px] mt-[24px]">
      {otpDigits.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleOtpChange(e.target.value, index)}
          onKeyDown={(e) => handleOtpKeyDown(e, index)}
          className="
            w-[56px]
            h-[56px]
            bg-[#1E1E1E]
            text-white
            text-center
            text-[20px]
            rounded-[8px]
            border border-white/10
            outline-none
            focus:border-white
          "
        />
      ))}
    </div>

              <p className="text-center text-gray-400 text-xs mt-2">
               Resend OTP in 34s
              </p>

              <button
                className="h-[56px] bg-white text-black rounded"
                onClick={handleOtpVerify}
              >
                Verify
              </button>
            </>
          )}

          {step === "NAME" && (
            <>
              <h1 className="text-white text-[24px] text-center">
                Welcome, You are?
              </h1>

              <input
                className="h-[48px] bg-[#1E1E1E] text-white px-4 rounded"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
              />

              <button
                className="h-[56px] bg-white text-black rounded"
                onClick={handleRegister}
              >
                Continue
              </button>
            </>
          )}

        </div>
      </div>
    </main>
  );
}
