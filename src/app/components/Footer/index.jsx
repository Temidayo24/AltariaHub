"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

const Footer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reset();
  };

  const FooterLink = ({ href, label, opacity }) => {
    return (
      <div>
        <Link
          href={href}
          className="text-sm text-black opacity-40 hover:underline"
        >
          {label}
        </Link>
      </div>
    );
  };

  const Images = ({ href, src, alt }) => {
    return (
      <Link
        href={href}
        className="hover:scale-[1.3] transition-all ease-in delay-75"
      >
        <img src={src} alt={alt} className="w-full" />
      </Link>
    );
  };

  return (
    <footer className="w-full bg-white flex flex-col">
      <section
        className="pc:py-[75px] pc:px-[90px]
            px-[35px] py-9 flex flex-col pc:flex-row
            gap-10 justify-between w-full pc:gap-32
          "
      >
        <div className="flex flex-col gap-5 pc:w-[350px]">
          <Link href={"/"} className="text-primary1 text-3xl font-bold">
            {/* <img src="/svg/icons/alt-logo.svg" /> */}
            One-Stop
          </Link>
          <div className="flex flex-col gap-3">
            <span className="font-[600]">Stay in the Loop</span>
            <p className="text-sm text-black text-opacity-40 leading-5">
              Get the latest updates, tips, and exclusive offers
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: true })}
                className="text-sm pl-2 text-black text-opacity-70 border-l-[1.5px] border-y-[1.5px] border-gray-300 rounded-tl-xl rounded-bl-xl h-11 w-full bg-transparent focus:border-primary1"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-14 flex items-center justify-center bg-primary1 rounded-tr-xl rounded-br-xl hover:opacity-button"
              >
                {isSubmitting ? (
                  <span className="border-white h-5 w-5 animate-spin rounded-full border-2 border-t-primary1"></span>
                ) : (
                  <img src="/svg/icons/send.svg" alt="send" />
                )}
              </button>
            </form>
            {isSubmitted && (
              <span className="text-primary1 text-sm font-bold">
                You have subscribed!
              </span>
            )}
          </div>
        </div>
        <div
          className="grid grid-cols-2 pc:flex pc:flex-row
            gap-10 pc:gap-y-10 justify-between w-full pc:flex-wrap"
        >
          <div className="flex flex-col gap-[12px]">
            <span className="text-black font-[500] text-sm">Help</span>
            <FooterLink label="Customer Service" href="/" />
            <FooterLink label="FAQ" href="/" />
            <FooterLink label="My orders" href="/" />
            <FooterLink label="Contact us" href="/" />
            <FooterLink label="Return Policy" href="/" />
            <FooterLink label="Refund Timeline" href="/" />
          </div>
          <div className="flex flex-col gap-[12px] ">
            <span className="text-black font-[500] text-sm">
              About One-Stop
            </span>
            <FooterLink label="About us" href="/" />
            <FooterLink label="Privacy notice" href="/" />
            <FooterLink label="Terms and Conditions" href="/" />
            <FooterLink label="Cookie notice" href="/" />
            <FooterLink label="Careers" href="/" />
            <FooterLink label="Blog" href="/" />
          </div>
          <div className="flex flex-col gap-[12px]">
            <span className="text-black font-[500] text-sm">Services</span>
            <FooterLink label="One-Stop Market" href="/" />
            <FooterLink label="One-Stop Cares" href="/" />
            <FooterLink label="One-Stop Events" href="/" />
            <FooterLink label="One-Stop Community" href="/" />
            <FooterLink label="One-Stop Health" href="/" />
            <FooterLink label="One-Stop Learning" href="/" />
          </div>
          <div className="flex flex-col gap-[12px] w-fit text-black font-[500] text-sm">
            <span className="">Registry</span>
            <Link href="/">Sell on One-Stop</Link>
            <Link href="/">Become a Logistics partner</Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col pc:flex-row gap-y-6 pc:gap-0 pc:justify-between pc:py-[50px] py-[30px] pc:mx-[90px] mx-[35px] border-t-[1px] ">
        <div className="flex gap-3 pc:gap-6 items-center">
          <Images src="/svg/icons/facebook.svg" alt="facebook" href="/" />
          <Images src="/svg/icons/instagram.svg" alt="instagram" href="/" />
          <Images src="/svg/icons/x.svg" alt="twitter" href="/" />
          <Images src="/svg/icons/youtube.svg" alt="youtube" href="/" />
        </div>
        <div className="flex gap-4 pc:gap-7 items-center">
          <Images src="/svg/icons/visa.svg" alt="visa" href="/" />
          <Images src="/svg/icons/mastercard.svg" alt="mastercard" href="/" />
          <Images src="/svg/icons/paypal.svg" alt="paypal" href="/" />
          <Images src="/svg/icons/paystack.svg" alt="paystack" href="/" />
          <Images src="/svg/icons/interswitch.svg" alt="interswitch" href="/" />
        </div>
        <div className="hidden pc:block"></div>
      </section>
      <section className="text-center w-full bg-primary2 py-7 pc:px-7 pc:py-6">
        <p className="text-white text-sm">
          ©2024, One-Stop. All Rights Reserved
        </p>
      </section>
    </footer>
  );
};

export default Footer;
