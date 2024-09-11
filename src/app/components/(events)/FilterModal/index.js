import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const FilterModal = ({
  isOpen,
  onClose,
  locationOptions,
  eventTypeOptions,
  ageGroupOptions,
  priceRanges,
  filterEvents,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
    watch,
  } = useForm();

  const [filtersApplied, setFiltersApplied] = useState(false);

  const watchFields = watch(); // Watch form fields

  useEffect(() => {
    // Check if any filter is applied
    setFiltersApplied(
      Object.values(watchFields).some((value) => value !== "" && value !== null)
    );
  }, [watchFields]);

  const onSubmit = (data) => {
    const { location, eventType, ageGroup, priceRange, date } = data;
    const cleanPriceRange = priceRange.replace("₦", "");
    console.log(data);
    filterEvents({
      location,
      priceRange: cleanPriceRange,
      ageGroup,
      eventType,
      start_date: date,
    });
    setFiltersApplied(true);
    onClose();
  };

  const handleCancelFilter = () => {
    reset();
    filterEvents({
      location: "",
      priceRange: "",
      ageGroup: "",
      eventType: "",
      start_date: "",
    });
    setFiltersApplied(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[330px]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium mb-4">Filter</h2>
          <Image
            src={"/svg/icons/cancel.svg"}
            alt=""
            height={12}
            width={12}
            className="cursor-pointer"
            priority={true}
            onClick={onClose}
          />
        </div>
        <form
          className="flex flex-col gap-2 text-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="mt-2">
              Location
            </label>
            <select
              {...register("location")}
              className="h-10 w-full pl-3 rounded-lg bg-transparent border flex items-center gap-3"
            >
              <option value="" selected>
                Select Location
              </option>
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="eventType" className="mt-2">
              Event Type
            </label>
            <select
              {...register("eventType")}
              className="h-10 w-full pl-3 rounded-lg bg-transparent border flex items-center gap-3"
            >
              <option value="" selected>
                Select Event Type
              </option>
              {eventTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="ageGroup" className="mt-2">
              Age Group
            </label>
            <select
              {...register("ageGroup")}
              className="h-10 w-full pl-3 rounded-lg bg-transparent border flex items-center gap-3"
            >
              <option value="" selected>
                Select Age Group
              </option>
              {ageGroupOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="priceRange" className="mt-2">
              Price Range
            </label>
            <select
              {...register("priceRange")}
              className="h-10 w-full pl-3 rounded-lg bg-transparent border flex items-center gap-3"
            >
              <option value="" selected>
                Select Price Range
              </option>
              {priceRanges.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="mt-2">
              Date
            </label>
            <input
              type="date"
              {...register("date")}
              className="h-10 w-full pl-3 rounded-lg bg-transparent border flex items-center gap-3"
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            {filtersApplied && (
              <div
                onClick={handleCancelFilter}
                title="Clear Filters"
                className="cursor-pointer w-full"
              >
                Clear Filters
              </div>
            )}
            <button
              type="submit"
              className="text-white bg-primary1 px-4 py-2 rounded-lg w-full hover:opacity-button"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
