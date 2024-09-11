"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import useCartStore from "@/app/store/cartStore";
import Link from "next/link";

const ThankYou = () => {
  const { orderDetails } = useCartStore((state) => ({
    orderDetails: state.orderDetails,
  }));

  return (
    <div className="mt-48">
      <div className="flex flex-col justify-center w-fit gap-3 m-auto">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="bg-[url('/svg/icons/confetti.svg')] bg-cover h-32 w-28 bg-no-repeat py-3 px-2 flex items-center justify-center">
            <Image
              priority={true}
              src={"/images/check.png"}
              alt=""
              width={60}
              height={60}
            />
          </div>
          <p className="text-xl font-medium">Thank You for Your purchase!</p>
          <p className="text-center font-light">
            Your Order {orderDetails?.order_id} has been placed{" "}
            <span className="underline text-primary1 text-sm">Track order</span>
          </p>
          <p className="text-center text-sm">
            We've received your order and are processing it. You will <br />{" "}
            receive an email confirmation shortly.
          </p>
        </div>
        <div className="flex flex-col gap-3 border p-3 rounded">
          <div>
            <p className="font-semibold text-[15px] mb-3">Order Details</p>
            <div className="flex flex-col gap-4">
              {orderDetails?.items.map((item) => {
                const p = item?.selected_properties.reduce(
                  (acc, prop) => acc + prop.price,
                  0
                );

                const q = item?.selected_properties.reduce(
                  (acc, prop) => acc + prop.quantity,
                  ""
                );

                const s = item?.selected_properties.reduce(
                  (acc, prop) => acc + prop.size,
                  ""
                );

                const c = item?.selected_properties.reduce(
                  (acc, prop) => acc + prop.color,
                  ""
                );
                return (
                  <div key={item?._id} className="flex h-full gap-3">
                    <Image
                      src={"/images/p2.jpg"}
                      alt=""
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex flex-col gap-[5px]">
                        <div className="flex justify-between gap-2 w-full text-[15px]">
                          <span className="w-full"> {item?.product_name}</span>
                          <span>&#8358;{p}</span>
                        </div>
                        <div className="flex gap-4 text-xs">
                          <span>
                            Color: <span>{c}</span>
                          </span>
                          <span>
                            Size: <span>{s}</span>
                          </span>
                          <span>
                            Qty: <span>{q}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[15px] mt-3 border-t py-2">
              Order Total <span>&#8358;{orderDetails?.total_price}</span>
            </div>
          </div>
          <div>
            <span className="text-black text-opacity-65 text-[15px]">
              Delivery Address
            </span>
            <div className="  text-sm max-w-[350px]">
              {orderDetails?.address_of_buyer}
            </div>
          </div>
        </div>
        <div className="flex justify-between font-light text-sm items-center mt-4 gap-5">
          <Link
            href="/shop"
            className="bg-primary1 text-white py-1 px-2 rounded"
          >
            Continue Shopping
          </Link>
          <div className="text-primary1">
            Need help with your order?{" "}
            <span className="underline">Contact Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
