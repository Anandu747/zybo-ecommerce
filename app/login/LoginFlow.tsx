"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "PHONE" | "OTP" | "NAME";

export default function LoginFlow() {
  const [step, setStep] = useState<Step>("PHONE");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const router = useRouter();

  async function sendOtp() {
    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ phone_number: phone }),
    }).then(res => res.json());

    res.user ? setStep("OTP") : setStep("NAME");
  }

  async function verifyOtp() {
    // Static OTP check
    if (otp.join("") === "1234") {
      router.push("/profile");
    }
  }

  async function registerUser() {
    await fetch("/api/login-register", {
      method: "POST",
      body: JSON.stringify({ name, phone_number: phone }),
    });
    router.push("/profile");
  }

  return (
    <div className="w-[360px] bg-black p-8 rounded-xl text-white">

      {step === "PHONE" && (
        <>
          <h1 className="text-center mb-6">Log In</h1>
          <input
            className="w-full bg-zinc-900 p-3 rounded mb-4"
            placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="w-full bg-white text-black py-3" onClick={sendOtp}>
            Continue
          </button>
        </>
      )}

      {step === "OTP" && (
        <>
          <h1 className="text-center mb-4">Verify phone</h1>
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((_, i) => (
              <input
                key={i}
                maxLength={1}
                className="w-12 h-12 bg-zinc-900 text-center"
                onChange={(e) => {
                  const copy = [...otp];
                  copy[i] = e.target.value;
                  setOtp(copy);
                }}
              />
            ))}
          </div>
          <button className="w-full bg-white text-black py-3" onClick={verifyOtp}>
            Verify
          </button>
        </>
      )}

      {step === "NAME" && (
        <>
          <h1 className="text-center mb-6">Welcome, You are?</h1>
          <input
            className="w-full bg-zinc-900 p-3 rounded mb-4"
            placeholder="Eg: John Mathew"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="w-full bg-white text-black py-3" onClick={registerUser}>
            Continue
          </button>
        </>
      )}
    </div>
  );
}
