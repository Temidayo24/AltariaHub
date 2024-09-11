"use client";
import formattedDateTime from "@/app/components/(events)/FormattedDateTime";
import useServiceStore from "@/app/store/serviceStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Service = () => {
  const { service } = useParams();
  const { services, fetchServices } = useServiceStore((state) => ({
    services: state.services,
    fetchServices: state.fetchServices,
  }));

  useEffect(() => {
    fetchServices({ service_id: service });
  }, [service]);

  return (
    <div className="mt-40 pc:mx-20">
      {services.map((data) => {
        const days = Object.keys(data.operation_time);
        const time = Object.values(data.operation_time);

        console.log(typeof time, time);
        return (
          <div key={data._id} className="flex flex-col gap-8">
            <div className="h-[250px] pc:h-[400px] w-full">
              <Image
                src={"/images/serviceP.jpg"}
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
                <p className="text-4xl font-medium">{data.service_name}</p>
                <p className="mt-4">{data.description}</p>
                <div className="h-[220px] pc:h-[300px] w-full mt-4">
                  <Image
                    src={"/images/serviceP.jpg"}
                    alt=""
                    height={9999}
                    width={9999}
                    className="rounded-2xl"
                    priority={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="flex flex-col  gap-4 mt-10 border-t py-5">
                  <span className="text-2xl font-medium">Reviews</span>
                  <p>(No review available for this service)</p>
                </div>
              </div>
              {/* right layout */}

              <div className="flex flex-col gap-4 w-full tablet:w-[350px] border rounded-xl p-4 h-fit mt-5">
                <div className="text-[#494C50] border-b pb-4 flex  flex-wrap  items-center gap-5">
                  <div className="flex items-center gap-1 text-sm w-full">
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
                  <div className="flex items-center gap-1 text-sm w-full">
                    <Image
                      src={"/svg/icons/clock.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className=""
                      priority={true}
                    />
                    <div className="flex items-center gap-3">
                      <p>
                        {" "}
                        {Array.isArray(time) && time.length > 0
                          ? time[0].replace(/:/g, " - ")
                          : "N/A"}{" "}
                      </p>
                      <p> {days[0].replace(/_/g, " - ")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <Image
                      src={"/svg/icons/mail.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className=""
                      priority={true}
                    />
                    <span>Send Mail</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Image
                      src={"/svg/icons/website.svg"}
                      alt=""
                      height={24}
                      width={20}
                      className=""
                      priority={true}
                    />
                    <span>Website</span>
                  </div>
                </div>
                <button
                  type="type"
                  className="text-white bg-primary1 w-full text-center h-9 px-3 rounded-lg text-sm border-none hover:opacity-button"
                >
                  Contact Provider
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Service;
