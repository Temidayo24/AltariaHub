"use client";

import Heading from "../component/heading";
import Button from "../component/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

const ResetEmail = () => {
  const {
    handleSubmit,
    reset,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  const { resetOTP } = useAuthStore((state) => ({
    resetOTP: state.resetOTP,
  }));

  const goBack = () => {
    router.back();
  };

  const onSubmit = async () => {
    try {
      await resetOTP({ email: getValues("email") });
      router.push("/verifyOTP");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col m-auto justify-center max-w-[420px] items-center gap-8 py-10">
      <div className="flex flex-col gap-8 w-full">
        <Heading
          title="Reset Password"
          text="Please verify your email for us. Once you do, we'll send instructions to
reset your password."
        />
        <form
          className="flex flex-col gap-3 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[6px]">
            <label
              for="email"
              className="text-black text-opacity-60 text-sm font-[500]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="myemail@gmail.com"
              {...register("email", {
                required: true,
              })}
              className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
            />
          </div>
          <Button text="Submit" isSubmitting={isSubmitting} />
        </form>
      </div>
      <div onClick={goBack}>&lsaquo; Back</div>
    </section>
  );
};

export default ResetEmail;
