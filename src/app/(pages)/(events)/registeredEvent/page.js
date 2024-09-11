"use client";
import Image from "next/image";
import React, { useState } from "react";

const RegisteredEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="mt-48 mb-10">
      <div className="flex flex-col justify-center items-center w-fit gap-3 m-auto">
        <div className="bg-[url('/svg/icons/confetti.svg')] bg-cover h-32 w-28 bg-no-repeat py-3 px-2 flex items-center justify-center">
          <Image
            priority={true}
            src={"/images/check.png"}
            alt=""
            width={60}
            height={60}
          />
        </div>
        <p className="text-xl font-medium">Thank You for registering!</p>
        <p className="text-center text-sm">
          You will receive an email confirmation with your ticket(s) and event
          details
        </p>
        <button
          type="submit"
          className="bg-primary1 px-3 flex items-center justify-center w-fit mt-3 text-white h-[45px] rounded-lg hover:opacity-button"
        >
          {isSubmitting ? (
            <span className="border-white h-6 w-6 animate-spin rounded-full border-2 border-t-primary1"></span>
          ) : (
            <span className="font-[400] text-[14px]">View Your Events</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RegisteredEvent;
