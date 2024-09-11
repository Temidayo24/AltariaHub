"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Heading from "../component/heading";
import Button from "../component/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const route = useRouter();
  const loginUser = useAuthStore((state) => state.login);

  const onSubmit = async () => {
    const data = {
      email: getValues("email"),
      password: getValues("password"),
    };

    try {
      await loginUser(data);
      console.log(data);
      route.push("/verifyAccount");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center py-10">
      <div className="flex flex-col gap-8 max-w-[420px] w-full">
        <Heading title="Welcome back to Altaria Hub" text="" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-2"
        >
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
                required: "Please enter an email address",
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
              placeholder="*************"
              {...register("password", {
                required: "Please enter your password",
              })}
              className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
            />
            <Link href="/verifyEmail">
              <span className="border-b-[1px] border-gray-400 text-black text-opacity-50 text-[13px] font-[500]">
                Forgot Password?
              </span>
            </Link>
          </div>
          <Button text="Login" isSubmitting={isSubmitting} />
        </form>
        <div className="mt-1">
          <p className="text-center text-base">
            <span className="text-black">Don&#39;t have an account?</span>
            &nbsp;
            <span>
              <Link
                className="text-primary1 font-semibold border-b-[1px] border-b-primary1"
                href="/register"
              >
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
