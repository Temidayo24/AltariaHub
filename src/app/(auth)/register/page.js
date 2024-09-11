"use client";
import React, { useState } from "react";
import Heading from "../component/heading";
import { useForm } from "react-hook-form";
import Button from "../component/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

const Register = () => {
  const {
    handleSubmit,
    reset,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const route = useRouter();
  const registerUser = useAuthStore((state) => state.register);

  const onSubmit = async () => {
    const data = {
      first_name: getValues("fName"),
      last_name: getValues("lName"),
      email: getValues("email"),
      password: getValues("password"),
    };

    try {
      await registerUser(data);
      route.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="flex flex-col m-auto justify-center max-w-[420px] items-center gap-4 py-10">
      <div className="flex flex-col gap-8 w-full">
        <Heading title="Join Altaria Hub" text="" />
        <form
          className="flex flex-col gap-3 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="fName"
              className="text-black text-opacity-60 text-sm font-[500]"
            >
              First Name
            </label>
            <input
              type="text"
              name="fName"
              placeholder="Segun"
              {...register("fName", {
                required: "Please enter your full name",
              })}
              className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="lName"
              className="text-black text-opacity-60 text-sm font-[500]"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lName"
              placeholder="Benson"
              {...register("lName", {
                required: "Please enter your full name",
              })}
              className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="email"
              className="text-black text-opacity-60 text-sm font-[500]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="myemail@gmail.com"
              {...register("email", {
                required: "Please enter your email address",
              })}
              className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="password"
              className="text-black text-opacity-60 text-sm font-[500]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="**********"
              {...register("password", {
                required: "Please enter your password",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message:
                    "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character",
                },
              })}
              className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
            />

            {errors.password && (
              <span className="text-[12.5px] opacity-50">
                Your password should be at least 8 characters long, include
                uppercase and lowercase letters, a number, and a special
                character.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="cPassword"
              className="text-black text-opacity-60 text-sm font-[500]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="cPassword"
              placeholder="**********"
              {...register("cPassword", {
                required: "Confirm your password",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords do not match";
                },
              })}
              className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
            />
            {errors.cPassword && (
              <span className="text-[12.5px] opacity-50">
                Passwords do not match!
              </span>
            )}
          </div>
          <Button isSubmitting={isSubmitting} text="Register" />
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-center text-sm">
          By proceeding, you agree to the{" "}
          <Link href="/" className="opacity-40">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link href="/" className="opacity-40">
            Privacy Policy
          </Link>
        </div>
        <div className="mt-1">
          <p className="text-center text-base">
            <span className="text-black">Already have an account?</span>
            &nbsp;
            <span>
              <Link
                className="text-primary1 font-semibold border-b-[1px] border-b-primary1"
                href="/auth/login"
              >
                Sign in
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
