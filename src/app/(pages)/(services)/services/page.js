"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useServiceStore from "@/app/store/serviceStore";
import ServiceCard from "@/app/components/ServiceCard";
import EmblaCarousel from "@/app/components/Carousel";

const OPTIONS = { align: "start", dragFree: true, loop: true };

const Services = () => {
  const { services, fetchServices } = useServiceStore((state) => ({
    services: state.services,
    fetchServices: state.fetchServices,
  }));

  const [displayedServices, setDisplayedServices] = useState([]);
  const [servicesToShow, setServicesToShow] = useState(8);
  const [topQuery, setTopQuery] = useState("");
  const [bottomQuery, setBottomQuery] = useState("");
  const [serviceType, setServiceType] = useState("");

  useEffect(() => {
    fetchServices({ service_type: serviceType });
  }, [serviceType]);

  useEffect(() => {
    let filteredServices = services;

    // Apply filtering based on topQuery if it exists
    if (topQuery) {
      filteredServices = filteredServices.filter(
        (service) =>
          service.location.address
            .toLowerCase()
            .includes(topQuery.toLowerCase()) ||
          service.location.city
            .toLowerCase()
            .includes(topQuery.toLowerCase()) ||
          service.location.country
            .toLowerCase()
            .includes(topQuery.toLowerCase()) ||
          service.service_name.toLowerCase().includes(topQuery.toLowerCase())
      );
    }

    // Apply filtering based on bottomQuery if it exists
    if (bottomQuery) {
      filteredServices = filteredServices.filter(
        (service) =>
          service.location.address
            .toLowerCase()
            .includes(bottomQuery.toLowerCase()) ||
          service.location.city
            .toLowerCase()
            .includes(bottomQuery.toLowerCase()) ||
          service.location.country
            .toLowerCase()
            .includes(bottomQuery.toLowerCase())
      );
    }

    // Set the displayed services with pagination
    setDisplayedServices(filteredServices.slice(0, servicesToShow));
  }, [services, topQuery, bottomQuery, servicesToShow]);

  const handleInputChangeForKeyword = (e) => {
    setTopQuery(e.target.value.trim());
    setServicesToShow(8); // Reset the number of services shown when searching
  };

  const handleInputChangeForLocation = (e) => {
    setBottomQuery(e.target.value.trim());
    setServicesToShow(8); // Reset the number of services shown when searching
  };

  const showMoreServices = () => {
    setServicesToShow((prev) => prev + 8);
  };

  const serviceTypes = Array.from(
    new Set(services.map((service) => service.service_type))
  );

  const handleFilter = (e) => {
    setServiceType(e.target.value);
  };

  const handleCancelFilter = () => {
    setServiceType("");
  };

  return (
    <div className="mt-40">
      <div className="bg-sBanner bg-no-repeat bg-cover h-[200px] pc:h-[440px] rounded-xl flex flex-col gap-4 justify-center items-start px-8">
        <p className="text-4xl w-fit font-bold">
          Find Trusted Service <br /> Providers
        </p>
        <span className="w-fit text-center">
          Connect with nannies, daycare centers, and more{" "}
        </span>
        <div className="bg-white font-light flex items-center gap-2 rounded-lg h-11 w-[400px] max-w-[400px] pl-2 text-xs focus:border-primary1">
          <div>
            <Image
              src={"/svg/icons/search-black.svg"}
              alt=""
              height={19}
              width={19}
              className=""
              priority={true}
            />
          </div>
          <input
            type="text"
            placeholder="Search for service providers by keyword or location"
            onChange={handleInputChangeForKeyword}
            className="w-full h-full rounded-lg bg-transparent"
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <p>Featured services</p>
        <EmblaCarousel slides={services} options={OPTIONS} />
      </div>
      <div className="flex flex-col gap-6 mt-24">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 border-[1px] border-gray-300 rounded-full h-11 w-[500px] pl-5 text-sm focus:border-primary1">
            <div>
              <Image
                src={"/svg/icons/search-black.svg"}
                alt=""
                height={19}
                width={19}
                className=""
                priority={true}
              />
            </div>
            <input
              type="text"
              placeholder="Enter location or use current location"
              onChange={handleInputChangeForLocation}
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex gap-2 items-center">
            <select
              onChange={handleFilter}
              value={serviceType}
              className="flex items-center gap-2 bg-gray-100 rounded-3xl px-2 py-2 text-sm cursor-pointer"
            >
              <option value="" selected disabled>
                Filter
              </option>
              {serviceTypes.map((type, index) => (
                <option value={type} key={index}>
                  {type}
                </option>
              ))}
            </select>
            {serviceType && (
              <div
                onClick={handleCancelFilter}
                title="clear filter"
                className="cursor-pointer bg-primary1 text-white px-2"
              >
                x
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          {displayedServices.map((service) => {
            return (
              <div
                key={service._id}
                className="basis-[calc(25%-20px)] min-w-[250px]"
              >
                <ServiceCard
                  title={service.service_name}
                  text={service.description}
                  location={`${service.location.address}${", "}${
                    service.location.city
                  } `}
                  img={"/images/serviceP.jpg"}
                  href={`/services/${service._id}`}
                  width={"w-full"}
                />
              </div>
            );
          })}
        </div>
        {displayedServices.length > 0 &&
          displayedServices.length <
            services.filter(
              (service) =>
                service.location.address
                  .toLowerCase()
                  .includes(topQuery.toLowerCase()) ||
                service.location.city
                  .toLowerCase()
                  .includes(topQuery.toLowerCase()) ||
                service.location.country.includes(topQuery.toLowerCase())
            ).length && (
            <div className="flex justify-center items-center">
              <button
                onClick={showMoreServices}
                className="text-white bg-primary1 w-fit text-center h-9 px-3 rounded-lg text-sm border-none hover:opacity-button"
              >
                Show More
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Services;
