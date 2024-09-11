"use client";
import React, { useEffect, useState } from "react";
import EventCard from "@/app/components/(events)/EventCard";
import useEventStore from "@/app/store/eventStore";
import Image from "next/image";
import DateRangePicker from "@/app/components/(events)/DatePicker";
import CustomDropdown from "@/app/components/(events)/DropDown";
import formattedDateTime from "@/app/components/(events)/FormattedDateTime";
import FilterModal from "@/app/components/(events)/FilterModal";
import EmblaCarousel from "@/app/components/Carousel";

const OPTIONS = { align: "start", dragFree: true, loop: true };

const Events = () => {
  const {
    events,
    fetchEvents,
    filterEvents,
    featuredEvents,
    fetchFeaturedEvents,
  } = useEventStore((state) => ({
    events: state.events,
    fetchEvents: state.fetchEvents,
    filterEvents: state.filterEvents,
    featuredEvents: state.featuredEvents,
    fetchFeaturedEvents: state.fetchFeaturedEvents,
  }));

  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [eventsToShow, setEventsToShow] = useState(8);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
    fetchFeaturedEvents();
  }, [fetchEvents, fetchFeaturedEvents]);

  useEffect(() => {
    const filteredEvents = events.filter((event) =>
      event.event_name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedEvents(filteredEvents.slice(0, eventsToShow));
  }, [events, query, eventsToShow]);

  const handleInputChange = (e) => {
    setQuery(e.target.value.trim());
    setEventsToShow(8); // Reset the number of events shown when searching
  };

  const showMoreEvents = () => {
    setEventsToShow((prev) => prev + 8);
  };

  const locationOptions = events.map((event) => event.location.city);
  const eventTypeOptions = events.map((event) => event.event_type);
  const ageGroupOptions = events.map((event) => event.age_group);
  const priceRangeOptions = events.map((event) => event.event_fee);
  const minPrice = Math.min(...priceRangeOptions);
  const maxPrice = Math.max(...priceRangeOptions);
  const priceRanges = [];
  const step = 50;

  for (let i = minPrice; i < maxPrice; i += 50) {
    const range = `₦${i} - ₦${i + 50}`;
    priceRanges.push(range);
  }

  const uniqueLocation = Array.from(new Set(locationOptions));
  const uniqueEventType = Array.from(new Set(eventTypeOptions));
  const uniqueAgeGroup = Array.from(new Set(ageGroupOptions));
  const formattedStartDate = startDate
    ? `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(startDate.getDate()).padStart(2, "0")}`
    : null;

  const formattedEndDate = endDate
    ? `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(endDate.getDate()).padStart(2, "0")}`
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Remove the Naira sign from the price range before sending it to the server
    const cleanPriceRange = priceRange.replace("₦", "");

    filterEvents({
      location,
      priceRange: cleanPriceRange,
      ageGroup,
      eventType,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    });
  };

  return (
    <div className="mt-40">
      <div className="bg-eBanner bg-no-repeat bg-cover h-[200px] pc:h-[440px] rounded-xl flex flex-col gap-4 justify-center items-center px-8">
        <p className="text-white text-4xl w-fit font-bold text-center">
          Discover Events and Activities for Families
        </p>
        <span className="text-white w-fit text-center">
          Find fun activities, classes, and events in your area
        </span>
        <form
          onSubmit={handleSubmit}
          className="hidden bg-white px-4 pc:px-8 py-5 w-fit rounded-lg pc:flex items-start gap-2"
        >
          <div className="flex flex-col gap-2">
            <CustomDropdown
              options={uniqueLocation}
              label="Location"
              onSelect={setLocation}
            />
            <div className="text-sm">{location}</div>
          </div>
          <div className="flex flex-col gap-2">
            <CustomDropdown
              options={uniqueEventType}
              label="Event Type"
              onSelect={setEventType}
            />
            <div className="text-sm">{eventType}</div>
          </div>
          <div className="flex flex-col gap-2">
            <CustomDropdown
              options={uniqueAgeGroup}
              label="Age Group"
              onSelect={setAgeGroup}
            />
            <div className="text-sm">{ageGroup}</div>
          </div>
          <div className="flex flex-col gap-2">
            <CustomDropdown
              options={priceRanges}
              label="Price"
              onSelect={setPriceRange}
            />
            <div className="text-sm">{priceRange}</div>
          </div>
          <div className="flex flex-col gap-2 relative">
            <div
              className="bg-transparent pr-8 flex items-center gap-1 cursor-pointer text-sm relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Date Range</span>
              <Image
                src={"/svg/icons/caret-down.svg"}
                alt=""
                height={18}
                width={20}
                className=""
                priority={true}
              />
            </div>
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg z-10">
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  setIsOpen={setIsOpen}
                />
              </div>
            )}
            <div className="text-sm">
              {startDate &&
                endDate &&
                `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary1 h-8 w-fit px-2 rounded-lg flex gap-2 justify-center items-center text-white text-xs pc:ml-3"
          >
            Find Event{" "}
            <Image
              src={"/svg/icons/arrow-right-white.svg"}
              alt=""
              height={16}
              width={16}
              className=""
              priority={true}
            />
          </button>
        </form>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <p>Featured Events</p>
        <EmblaCarousel slides={featuredEvents} options={OPTIONS} />
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
              placeholder="Search Event"
              onChange={handleInputChange}
              className="w-full h-full rounded-full"
            />
          </div>
          <div>
            <div
              className="flex items-center gap-2 bg-gray-100 rounded-3xl px-8 py-2 text-sm cursor-pointer"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <Image
                src={"/svg/icons/filter.svg"}
                alt=""
                height={15}
                width={15}
                className=""
                priority={true}
              />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          {displayedEvents.map((event) => {
            const { date, time } = formattedDateTime(event, "event");
            return (
              <div
                key={event._id}
                className="basis-[calc(25%-20px)] min-w-[250px]"
              >
                <EventCard
                  title={event.event_name}
                  text={event.description}
                  date={date}
                  img={"/images/eventP.jpg"}
                  href={`/events/${event._id}`}
                  width={"w-full"}
                />
              </div>
            );
          })}
        </div>
        {displayedEvents.length > 0 &&
          displayedEvents.length <
            events.filter((event) =>
              event.event_name.toLowerCase().includes(query.toLowerCase())
            ).length && (
            <div className="flex justify-center items-center">
              <button
                onClick={showMoreEvents}
                className="text-white bg-primary1 w-fit text-center h-9 px-3 rounded-lg text-sm border-none hover:opacity-button"
              >
                Show More
              </button>
            </div>
          )}
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        locationOptions={uniqueLocation}
        eventTypeOptions={uniqueEventType}
        ageGroupOptions={uniqueAgeGroup}
        priceRanges={priceRanges}
        filterEvents={filterEvents}
      />
    </div>
  );
};

export default Events;
