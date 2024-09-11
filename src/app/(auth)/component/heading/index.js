"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Heading = ({ text, title }) => {
  const pathname = usePathname();
  const googleAuthPaths = ["/login", "/register"];
  const isAuthPage = googleAuthPaths.includes(pathname);

  return (
    <div className="flex flex-col gap-4 items-center">
      <img src="/svg/icons/alt-logo.svg" alt="logo" />
      <div className="flex flex-col gap-1">
        <p className="text-center text-black text-[25px] font-[500]">{title}</p>
        {text && (
          <span className="text-center text-sm font-extralight">{text}</span>
        )}
      </div>
      {isAuthPage && (
        <div className="w-full flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 font-[500] border h-[50px] rounded-lg mt-2 cursor-pointer hover:opacity-80 hover:scale-[1.01]"
          >
            <img src="/svg/icons/google.svg" alt="google authentication" />
            <span className="text-black text-opacity-80">
              Continue with Google
            </span>
          </Link>
          <div className="flex gap-2 items-center w-full justify-between">
            <div className="h-[1px] flex-1 bg-gray-300"></div>
            <span className="w-fit text-center text-sm text-black text-opacity-30 font-[400]">
              or continue with email
            </span>
            <div className="h-[1px] flex-1 bg-gray-300"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heading;
