"use client";
import React, { useEffect, useState } from "react";
import useProductsStore from "@/app/store/productsStore";

const FilterBar = ({ currentState, products }) => {
  const { setSortBy, limit, query } = useProductsStore((state) => ({
    setSortBy: state.setSortBy,
    limit: state.limit,
    query: state.query,
  }));

  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const priceRanges = [
    "Under ₦5,000",
    "₦5,000 - ₦10,000",
    "₦10,000 - ₦50,000",
    "₦50,000 - ₦100,000",
    "₦100,000 - ₦200,000",
    "₦200,000 & Above",
  ];

  const categories = products.map((category) => category.category_name);
  const conditions = products.map((condition) => condition.condition);
  const uniqueCategories = Array.from(new Set(categories));
  const uniqueConditions = Array.from(new Set(conditions));

  const handleSubmit = (e) => {
    e.preventDefault();

    const sanitizedPriceRange = priceRange.replace(/[₦,]/g, ""); // Remove ₦ and commas
    currentState({ limit, condition, category: category, query, priceRange: sanitizedPriceRange });
  };

  const resetFilters = () => {
    setCondition("");
    setCategory("");
    setPriceRange("");
    // Call currentState to reset filters on the backend or in Zustand store if needed
    currentState({ limit, condition: "", category: "", priceRange: "", query: "" });
  };

  const SortDropdown = () => {
    const { setSortBy } = useProductsStore((state) => ({
      setSortBy: state.setSortBy,
    }));

    const handleSortChange = (event) => {
      setSortBy(event.target.value);
    };

    return (
      <div className="sort-dropdown">
        <label htmlFor="sort-options">Sort by:</label>
        <select id="sort-options" onChange={handleSortChange}>
          <option value="">Select an option</option>
          <option value="bestSelling">Best Selling</option>
          <option value="newArrivals">New Arrivals</option>
          <option value="thriftedItems">Thrift Items</option>
        </select>
      </div>
    );
  };

  return (
    <div className="">
      <div className="w-[250px] min-w-[250px] max-w-[350px] h-fit bg-white p-4 border rounded-lg">
        <div className="flex justify-between items-center mb-5">
          <span className="text-2xl">Filter</span>
          <div className="text-xs cursor-pointer" onClick={resetFilters}>
            Clear All <span className="text-lg">&#120;</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 ">
              <span className="font-medium text-[13px]">Product Condition</span>
              <div className="flex gap-3">
                {uniqueConditions.map((uniqueCondition) => (
                  <button
                    type="button"
                    className={`py-1 px-3 border rounded-lg text-sm ${
                      condition === uniqueCondition
                        ? "bg-primary1 border-none text-white"
                        : ""
                    }`}
                    onClick={() => setCondition(uniqueCondition)}
                  >
                    {uniqueCondition}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-[13px]">Subcategories</span>
              <div className="flex flex-col gap-3">
                {uniqueCategories.map((uniqueCategory) => (
                  <div
                    key={uniqueCategory}
                    className="flex items-center gap-2"
                    onClick={() => setCategory(uniqueCategory)}
                  >
                    <div
                      className={`h-[18px] w-[18px] border-2 rounded-sm cursor-pointer ${
                        category === uniqueCategory
                          ? "bg-primary1 border-none"
                          : ""
                      }`}
                    ></div>
                    <span className="text-sm font-normal cursor-pointer">
                      {uniqueCategory}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-[13px]">Price( ₦)</span>
              <div className="flex flex-col gap-3">
                {priceRanges.map((range) => (
                  <div
                    key={range}
                    className="flex items-center gap-2"
                    onClick={() => setPriceRange(range)}
                  >
                    <div
                      className={`h-[18px] w-[18px] border-2 rounded-sm cursor-pointer ${
                        priceRange === range ? "bg-primary1 border-none" : ""
                      }`}
                    ></div>
                    <span className="text-sm font-normal cursor-pointer">
                      {range}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <button
              className="py-1 px-5 bg-primary1 text-white text-sm rounded-md hover:opacity-button mt-6"
              type="submit"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterBar;
