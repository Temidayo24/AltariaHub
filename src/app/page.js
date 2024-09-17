"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./components/Buttons";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EmblaCarousel from "./components/Carousel";
import useProductsStore from "./store/productsStore";

const OPTIONS = { align: "start", dragFree: true, loop: true };

const Home = () => {
  const {
    topCategories,
    bestSellers,
    thriftedItems,
    newArrivals,
    fetchBestSellers,
    fetchTopCategories,
    fetchNewArrivals,
    fetchThriftItems,
    limit,
  } = useProductsStore((state) => ({
    topCategories: state.topCategories,
    bestSellers: state.bestSellers,
    thriftedItems: state.thriftedItems,
    newArrivals: state.newArrivals,
    fetchBestSellers: state.fetchBestSellers,
    fetchTopCategories: state.fetchTopCategories,
    fetchNewArrivals: state.fetchNewArrivals,
    fetchThriftItems: state.fetchThriftItems,
    limit: state.limit,
  }));

  useEffect(() => {
    fetchBestSellers();
    fetchNewArrivals({ limit });
    fetchThriftItems();
    fetchTopCategories();
  }, [
    fetchBestSellers,
    fetchNewArrivals,
    fetchThriftItems,
    fetchTopCategories,
  ]);

  const BestSellers = () => <EmblaCarousel slides={bestSellers} options={OPTIONS} />

  const NewArrivals = () => <EmblaCarousel slides={newArrivals} options={OPTIONS} />

  const ThriftedItems = () => <EmblaCarousel slides={thriftedItems} options={OPTIONS} />

  return (
    <div>
      <Header />
      <section className="flex flex-col gap-10 px-[35px] pt-40 pb-[30px] pc:px-[70px] ">
        <div className=" h-[350px] rounded-xl bg-banner bg-center bg-no-repeat bg-cover">
          <div className="flex justify-between items-center px-14 py-10 h-full">
            <div className="flex flex-col items-start justify-center gap-5 h-full">
              <div className="max-w-[370px] flex flex-col gap-3 =">
                <h1 className="font-[500] text-2xl pc:text-3xl text-left">
                  Your One-stop Shop for All Things Baby
                </h1>
                <span className="text-sm">
                  Find everything you need for your little one at One-Stop.
                  we connect you with top children's stores, product
                  manufacturers, and service providers&#8212;all in one place.
                </span>
              </div>
              <Button
                path={""}
                text={"Shop Now"}
                bgColor={"bg-primary1"}
                textColor={"text-white"}
                arrowWhite={true}
              />
            </div>
            <div className="hidden pc:block"></div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-[400] flex justify-between w-full">
            Shop from Top Categories
          </div>
          <div className="flex justify-between gap-2 py-3 ">
            {topCategories.map((category, index) => (
              <div className="w-1/6 flex flex-col justify-center items-center h-full gap-2 font-extralight text-lg">
                <Link href={`/topCategory/${category.name}`} key={category._id}>
                  <div className="w-full rounded-lg ">
                    <Image
                      priority={true}
                      src={"/images/cart.jpeg"}
                      alt=""
                      width={9999}
                      height={9999}
                      className="rounded-lg min-h-[200px] max-h-[220px] min-w-full max-w-full"
                    />
                  </div>
                </Link>
                <div key={category._id}>{category.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-[400] flex justify-between w-full">
            Best Sellers{" "}
            <Button
              text={"See all items"}
              path={"/shop"}
              textColor={"text-primary1"}
            />
          </div>
          <div className="">{BestSellers()}</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-[400] flex justify-between w-full">
            New Arrivals{" "}
            <Button
              text={"See all items"}
              path={"/shop"}
              textColor={"text-primary1"}
            />
          </div>
          <div className="">{NewArrivals()}</div>
        </div>
        <div className="flex flex-col gap-3 shadow-sm">
          <div className="text-2xl font-[400] flex justify-between w-full">
            Thrift Section{" "}
            <Button
              text={"See all items"}
              path={"/shop"}
              textColor={"text-primary1"}
            />
          </div>{" "}
          <div className="">{ThriftedItems()}</div>
        </div>
        <div className="py-10 flex flex-col gap-5">
          <div className="flex gap-5 ">
            <div className="w-3/5 h-[320px] rounded-xl bg-bg1 bg-center bg-no-repeat bg-cover">
              <div className="flex flex-col justify-between items-start px-8 py-10 text-white h-full">
                <div className="max-w-[370px] flex flex-col gap-3">
                  <h3 className="font-[400] text-2xl text-left">
                    Would you like to Sell your Items via our Ecommerce
                    Platform?
                  </h3>
                  <span className="text-sm">
                    Join our community of sellers and reach a wider audience
                    with ease
                  </span>
                </div>
                <Button
                  path={""}
                  text={"Start Selling Today"}
                  bgColor={"bg-white"}
                  textColor={"text-primary1"}
                />
              </div>
            </div>
            <div className="w-2/5 h-[320px] rounded-xl bg-bg2 bg-center bg-no-repeat bg-cover">
              <div className="flex flex-col justify-between items-start px-8 py-10 h-full">
                <div className="max-w-[250px] flex flex-col gap-3">
                  <h3 className="font-[400] text-2xl text-left">
                    Build your Dream Baby Registry
                  </h3>
                  <span className="text-sm">
                    Early manage and share your baby essentials wish list.
                  </span>
                </div>
                <Button
                  path={""}
                  text={"Create Your Registry"}
                  bgColor={"bg-white"}
                  textColor={"text-primary1"}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-5 ">
            <div className="w-2/5 h-[320px] rounded-xl bg-bg3 bg-center bg-no-repeat bg-cover">
              <div className="flex flex-col justify-between items-start px-8 py-10 h-full">
                <div className="max-w-[250px] flex flex-col gap-3">
                  <h3 className="font-[400] text-2xl text-left">
                    Unlock Parenting Secrets at Our Events
                  </h3>
                  <span className="text-sm">
                    Attend events designed to help you understand and connect
                    with your children better.
                  </span>
                </div>
                <Button
                  path={""}
                  text={"Discover Events"}
                  bgColor={"bg-white"}
                  textColor={"text-primary1"}
                />
              </div>
            </div>
            <div className="w-3/5 h-[320px] rounded-xl bg-bg4 bg-center bg-no-repeat bg-cover">
              <div className="flex flex-col justify-between items-start px-8 py-10 h-full">
                <div className="max-w-[250px] flex flex-col gap-3">
                  <h3 className="font-[400] text-2xl text-left">
                    Connect with Childcare Specialists!
                  </h3>
                  <span className="text-sm">
                    Find trusted professionals to support your child's health
                    and development.
                  </span>
                </div>
                <Button
                  path={""}
                  text={"Find a Specialist"}
                  bgColor={"bg-white"}
                  textColor={"text-primary1"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
