"use client";
import formattedDateTime from "@/app/components/(events)/FormattedDateTime";
import useEventStore from "@/app/store/eventStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Event = () => {
  const { event } = useParams();
  const { evenT, fetchEventByID, order, setOrder } = useEventStore((state) => ({
    evenT: state.event,
    fetchEventByID: state.fetchEventByID,
    order: state.order,
    setOrder: state.setOrder,
  }));

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  const [total, setTotal] = useState("");

  useEffect(() => {
    if (event) {
      fetchEventByID(event).then(() => {
        // Update total state with the event fee from the fetched data
        if (evenT.length > 0) {
          const eventFee = evenT?.map((e) => e.event_fee);
          setTotal(eventFee);
        }
      });
    }
  }, [fetchEventByID, event, evenT]);

  const onSubmit = () => {
    const name = getValues("name");
    const option = getValues("option");
    const quantity = getValues("quantity");
    const data = { name, option, quantity, total };

    setOrder(data);
  };

  const router = useRouter();

  const registerEvent = () => {
    router.push("/registeredEvent");
  };

  return (
    <div className="mt-40 pc:mx-20">
      {evenT.map((data) => {
        const { date, time } = formattedDateTime(data);
        return (
          <div key={data._id} className="flex flex-col gap-8">
            <div className="h-[250px] pc:h-[400px] w-full">
              <Image
                src={"/images/eventP.jpg"}
                alt=""
                height={9999}
                width={9999}
                className="rounded-2xl"
                priority={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="flex flex-col pc:flex-row gap-4 pc:gap-24">
              {/* left layout */}
              <div className="w-full pc:w-1/2 flex flex-col gap-3">
                <p className="text-4xl font-medium">{data.event_name}</p>
                <span>Hosted By: {data.event_host}</span>
                <div className="flex  flex-wrap  items-center gap-5">
                  <div className="flex items-center gap-1 text-sm">
                    <Image
                      src={"/svg/icons/calendar.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className=""
                      priority={true}
                    />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Image
                      src={"/svg/icons/clock.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className=""
                      priority={true}
                    />
                    <span>{time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Image
                      src={"/svg/icons/location.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className=""
                      priority={true}
                    />
                    <span>{`${data.location.address}${", "}${
                      data.location.city
                    }${", "}${data.location.country} `}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Image
                      src={"/svg/icons/age.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className=""
                      priority={true}
                    />
                    <span>{data.age_group}</span>
                  </div>
                </div>
                <p className="mt-4">{data.description}</p>
                <div className="h-[220px] pc:h-[300px] w-full mt-4">
                  <Image
                    src={"/images/eventP.jpg"}
                    alt=""
                    height={9999}
                    width={9999}
                    className="rounded-2xl"
                    priority={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="flex gap-4 items-center mt-5 border-t py-5">
                  <span>Share:</span>
                  <Image
                    src={"/svg/icons/fbk-orange.svg"}
                    alt=""
                    height={24}
                    width={28}
                    className="hover:scale-105 ease-in-out"
                    priority={true}
                  />
                  <Image
                    src={"/svg/icons/insta-orange.svg"}
                    alt=""
                    height={24}
                    width={28}
                    className="hover:scale-105 ease-in-out"
                    priority={true}
                  />
                  <Image
                    src={"/svg/icons/whatsapp-orange.svg"}
                    alt=""
                    height={24}
                    width={28}
                    className="hover:scale-105 ease-in-out"
                    priority={true}
                  />
                  <Image
                    src={"/svg/icons/twitter-orange.svg"}
                    alt=""
                    height={24}
                    width={28}
                    className="hover:scale-105 ease-in-out"
                    priority={true}
                  />
                </div>
              </div>
              {/* right layout */}
              {!isSubmitted ? (
                <div className="border rounded-xl p-4 h-fit mt-5">
                  <span className="font-medium text-[17px]">
                    Register for This Event
                  </span>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full pc:w-[350px] flex flex-col gap-4 mt-3"
                  >
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John"
                        {...register("name", { required: true })}
                        className={`h-10 w-full pl-3 rounded-lg flex items-center gap-3 ${
                          errors.name ? "border border-red-500" : "border"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          * Please type your name
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="option">Ticket Options</label>
                      <select
                        {...register("option", { required: true })}
                        className={`h-10 w-full pl-3 rounded-lg bg-transparent flex items-center gap-3 ${
                          errors.option ? "border border-red-500" : "border"
                        }`}
                      >
                        <option selected>VIP</option>
                        <option>Regular</option>
                      </select>
                      {errors.option && (
                        <p className="text-red-500 text-sm">
                          * Please choose an option
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="quantity">Quantity</label>
                      <div
                        className={`h-10 w-full pl-3 rounded-lg flex items-center gap-3 ${
                          errors.quantity ? "border border-red-500" : "border"
                        }`}
                      >
                        <Image
                          src={"/svg/icons/quantity.svg"}
                          alt=""
                          height={24}
                          width={18}
                          className="hover:scale-105 ease-in-out"
                          priority={true}
                        />
                        <input
                          type="text"
                          name="quantity"
                          placeholder="5 people"
                          {...register("quantity", {
                            required: true,
                            pattern: /^(?=.*\d)[\d]+$/,
                            message:
                              "Please input a valid quantity (digits only)",
                          })}
                          className="h-full"
                        />
                      </div>
                      {errors.quantity && (
                        <p className="text-red-500 text-sm">
                          * Please input a valid quantity
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total</span>
                      <div className="flex w-full justify-end items-end">
                        <span>&#8358;</span>
                        <div>{data.event_fee}</div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-primary1 w-full text-center h-9 px-3 rounded-lg text-sm border-none hover:opacity-button"
                    >
                      Register for This Event
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col gap-4 w-full tablet:w-[300px] border rounded-xl p-4 h-fit mt-5">
                  <span className="font-medium text-[17px]">Summary</span>
                  <div className="flex gap-2">
                    <Image
                      src={"/svg/icons/name.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className="hover:scale-105 ease-in-out"
                      priority={true}
                    />
                    <span>{order?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src={"/svg/icons/ticket.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className="hover:scale-105 ease-in-out"
                      priority={true}
                    />
                    <span>{order?.option}</span>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src={"/svg/icons/ticket.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className="hover:scale-105 ease-in-out"
                      priority={true}
                    />
                    <span>
                      {order?.quantity}{" "}
                      {order?.quantity > 1 ? " tickets" : " ticket"}
                    </span>
                  </div>
                  <div className="flex justify-between border-y py-3">
                    <span>Total</span>
                    <span> &#8358;{order?.total * order?.quantity}</span>
                  </div>
                  <button
                    onClick={registerEvent}
                    type="submit"
                    className="text-white bg-primary1 w-full text-center h-9 px-3 rounded-lg text-sm border-none hover:opacity-button"
                  >
                    Complete Registration
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Event;
