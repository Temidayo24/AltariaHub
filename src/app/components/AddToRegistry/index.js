import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddToRegistry = ({
  isOpen,
  onClose,
  createARegistry,
  addToARegistry,
  fetchARegistry,
  registries = [],
  product_id,
  user,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [createRegistry, setCreateRegistry] = useState(true);
  const [registryID, setRegistryID] = useState("");

  const handleCreateRegistry = () => {
    setCreateRegistry(false);
  };

  const addToRegistry = () => {
    addToARegistry({
      product_id: product_id,
      registry_id: registryID,
    });

    onClose();
  };

  useEffect(() => {
    fetchARegistry();
  }, [fetchARegistry]);

  const onSubmit = (data) => {
    const { type, name, date, description } = data;
    createARegistry({
      name_of_creator: user,
      gift_registry: type,
      registry_name: name,
      event_date: date,
      registry_description: description,
    });
    reset();
  };

  if (!isOpen) return null;
  return (
    <div className="bg-black inset-0 fixed bg-opacity-50 h-full z-50 flex flex-col gap-3 justify-center items-center">
      {createRegistry ? (
        <div className="flex flex-col gap-6 max-w-[400px] w-full bg-white rounded-md px-5 py-5">
          <div className="flex justify-between items-center font-medium text-2xl">
            Add to Registry{" "}
            <p className="cursor-pointer" onClick={onClose}>
              x
            </p>
          </div>
          {registries.length === 0 ? (
            <div className="text-medium font-sm">
              You have no registry. Kindly create a registry
            </div>
          ) : (
            <select
              onChange={(e) => setRegistryID(e.target.value)}
              className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
            >
              <option selected disabled></option>
              {registries.map((registry, index) => (
                <option key={index} value={registry._id}>
                  {registry.registry_name}
                </option>
              ))}
            </select>
          )}
          <div className="flex items-center justify-between">
            <button
              onClick={handleCreateRegistry}
              className="bg-transparent border-0 text-sm font-medium flex items-center justify-center w-fit  h-[45px] rounded-lg hover:opacity-button"
            >
              Create New Registry
            </button>
            <button
              onClick={addToRegistry}
              className="bg-primary1 flex items-center justify-center w-fit  text-white h-[40px] px-3 rounded-lg hover:opacity-button"
            >
              {isSubmitting ? (
                <span className="border-white h-6 w-6 animate-spin rounded-full border-2 border-t-primary1"></span>
              ) : (
                <span className="font-[400] text-[14px]">Add to Registry</span>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-[400px] w-full bg-white rounded-md px-5 py-5">
          <div className="flex justify-between items-center font-medium text-2xl">
            Create Registry{" "}
            <p
              onClick={() => setCreateRegistry(true)}
              className="cursor-pointer"
            >
              x
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3"
          >
            <div className="w-full flex flex-col gap-[4px]">
              <label htmlFor="registryType">Registry Type</label>
              <select
                {...register("type", { required: true })}
                className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
              >
                <option>Gift Registry</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-[4px]">
              <label htmlFor="registryName">Registry Name</label>
              <input
                type="text"
                placeholder="Registry Name"
                className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
                {...register("name", { required: true })}
              />
            </div>
            <div className="w-full flex flex-col gap-[4px]">
              <label htmlFor="date">Event Date</label>
              <input
                type="date"
                className="border-[1.5px] border-gray-300 h-[40px] pl-2 rounded-lg text-[15px]"
                {...register("date", { required: true })}
              />
            </div>
            <div>
              <textarea
                placeholder="Enter a description"
                className="mt-2 border-[1.5px] border-gray-300 h-[100px] pt-2 pl-2 rounded-lg text-[15px] w-full"
                {...register("description")}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={reset}
                type="button"
                className="bg-transparent border-0 text-sm font-medium flex items-center justify-center w-fit  h-[45px] rounded-lg hover:opacity-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary1 flex items-center justify-center w-fit  text-white h-[40px] px-3 rounded-lg hover:opacity-button"
              >
                {isSubmitting ? (
                  <span className="border-white h-6 w-6 animate-spin rounded-full border-2 border-t-primary1"></span>
                ) : (
                  <span className="font-[400] text-[14px]"> Create</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddToRegistry;
