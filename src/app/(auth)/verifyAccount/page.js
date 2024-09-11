"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import Heading from "../component/heading";
import Button from "../component/button";
import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

const inter = Inter({ subsets: ["latin"] });

const VerifyAccount = () => {
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef(new Array(6));
  const route = useRouter();
  const { verifyOTP, userEmail, resendOtp } = useAuthStore((state) => ({
    verifyOTP: state.verifyOTP,
    userEmail: state.email,
    resendOtp: state.resendOtp,
  }));

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      if (value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else if (index < inputRefs.current.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const onSubmit = async () => {
    const email = userEmail;
    const otpValue = otp.join("");
    if (email && otpValue.length === 6) {
      const data = { email, otp: otpValue };
      const success = await verifyOTP(data);
      if (success) {
        route.push("/shop");
      }
    } else {
      console.log("Invalid OTP or email");
      reset();
    }
  };

  const resendOTP = async () => {
    try {
      await resendOtp({ email: userEmail });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center py-10">
      <div className="flex flex-col gap-8 max-w-[420px] w-full">
        <Heading
          title="Verify Your Account"
          text="We've sent a One-Time Password (OTP) to your registered email address. Please enter the OTP below to verify your account."
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-2"
        >
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                name={`otp${index}`}
                onChange={(e) => handleOtpChange(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
                maxLength={1}
                required
                className={`h-full w-full text-center border text-[48px] font-[500] border-gray-400 rounded-md basis-1/6 opacity-40 ${inter.className}`}
              />
            ))}
          </div>
          <Button text="Verify" isSubmitting={isSubmitting} />
        </form>
        <div className="mt-1">
          <p className="text-center text-base">
            <span className="text-black">Didn't receive an OTP?</span>
            &nbsp;
            <span
              className="text-primary1 font-semibold border-b-[1px] border-b-primary1 cursor-pointer"
              onClick={resendOTP}
            >
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyAccount;
