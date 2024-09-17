"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import subCategory from "../data";
import { useAuthStore } from "@/app/store/authStore";
import useCartStore from "@/app/store/cartStore";

const Header = () => {
  const currentPath = usePathname();
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [signInDropdown, setSignInDropdown] = useState(false);
  const { signedIn, user, logout } = useAuthStore((state) => ({
    signedIn: state.signedIn,
    user: state.user,
    logout: state.logout,
  }));
  const cart = useCartStore((state) => state.cart);
  const [query, setQuery] = useState("");

  const getTotalQuantity = (cart_) => {

    return cart_.reduce((total, product) => {
      const productQuantity = product.selected_properties.reduce((sum, prop) => {
        return sum + prop.quantity;
      }, 0);
      return total + productQuantity;
    }, 0);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value.trim());
  };
  const route = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    route.push(`/shop?query=${query}`);
  };

  const handleCategoryToggle = () => {
    setCategoryDropdown(!categoryDropdown);
  };

  const handleSignInDropdown = () => {
    setSignInDropdown(!signInDropdown);
  };

  const NavLink = ({ path, text }) => (
    <li className="flex items-center gap-2 font-extralight">
      <Link
        href={path}
        className={currentPath === path ? "text-primary1" : "text-black"}
      >
        {text}
      </Link>
    </li>
  );



  const NavDropDown = ({ text, path, src, alt, onClick }) => (
    <li className="flex items-center gap-2 font-extralight w-full">
      <Link
        href={path}
        className="hover:text-primary1 flex gap-3 items-center font-extralight text-[13px] w-full"
        onClick={onClick}
      >
        <img src={src} alt={alt} className="hover:img-orange w-[18px]" />
        {text}
      </Link>
    </li>
  );

  return (
    <div className="px-[70px] py-7 flex flex-col gap-6 fixed w-[100vw] bg-white z-40">
      <div className="flex justify-between">
        <Link href={"/"} className="text-primary1 text-3xl font-bold">
          {/* <img src="/svg/icons/alt-logo.svg" /> */}
          One-Stop
        </Link>
        <form className="flex basis-1/3" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Search for products, brands and categories"
            onChange={handleInputChange}
            className="border-y-[1px] border-l-[1px] border-gray-300 rounded-bl-full rounded-tl-full h-11 w-full pl-6 text-sm focus:border-primary1"
          />
          <button className="bg-primary1 border-0 rounded-tr-full rounded-br-full flex items-center justify-center w-14 h-11 hover:opacity-button">
            <img src="/svg/icons/search.svg" alt="search button" />
          </button>
        </form>
        <div className="flex items-center gap-5 relative cursor-pointer">
          <Link href="/cart" className="relative flex w-fit">
            <img
              src="/svg/icons/cart.svg"
              alt="cart button"
              className="relative"
            />
            {cart.length > 0 && (
              <span className="absolute top-[-30%] right-[-30%] rounded-full bg-primary1 text-white py-[0px] px-[6px] text-[12.5px]">
                {getTotalQuantity(cart)}
              </span>
            )}
          </Link>
          <span
            className={`flex items-center gap-2 ${signInDropdown ? "text-primary1" : ""
              }`}
            onClick={handleSignInDropdown}
          >
            {signedIn === true
              ? `Hi, ${user}` // Use user for traditional login
              : "Sign In"}
            <img
              src="/svg/icons/arrow-down.svg"
              className={signInDropdown ? "img-orange rotate-180" : ""}
            />
          </span>
          {signInDropdown &&
            (signedIn === true ? (
              <ul className="flex flex-col gap-5 rounded-lg absolute top-full -left-3 z-20 px-4 pt-6 pb-3 bg-white shadow-lg min-w-[170px] list-none">
                <NavDropDown
                  text="My account"
                  src={"/svg/icons/account.svg"}
                  alt={"my account button"}
                  path={"/"}
                />
                <NavDropDown
                  text="Orders"
                  src={"/svg/icons/orders.svg"}
                  alt={"my orders button"}
                  path={"/"}
                />
                <NavDropDown
                  text="Switch to vendor"
                  src={"/svg/icons/vendor.svg"}
                  alt={"vendor button"}
                  path={"/"}
                />
                <NavDropDown
                  text="Notifications"
                  src={"/svg/icons/notif.svg"}
                  alt={"Notifications button"}
                  path={"/"}
                />
                <NavDropDown
                  text="Wishlist"
                  src={"/svg/icons/wish.svg"}
                  alt={"Wishlist button"}
                  path={"/"}
                />
                <NavDropDown
                  text="Gift Registries"
                  src={"/svg/icons/gift.svg"}
                  alt={"Gift Registry button"}
                  path={"/"}
                />
                <NavDropDown
                  text="Logout"
                  src={"/svg/icons/logout.svg"}
                  alt={"Logout button"}
                  path={"/"}
                  onClick={logout}
                  v
                />
              </ul>
            ) : (
              <ul className="flex flex-col gap-5 rounded-lg absolute top-full -left-3 z-20 px-4 pt-6 pb-3 bg-white shadow-lg min-w-[170px] list-none">
                <NavDropDown
                  text="Sign in"
                  src={"/svg/icons/login.svg"}
                  alt={"login button"}
                  path={"/login"}
                />
                <NavDropDown
                  text="Orders"
                  src={"/svg/icons/orders.svg"}
                  alt={"my orders button"}
                  path={"/"}
                />
                <NavDropDown
                  text="Switch to vendor"
                  src={"/svg/icons/vendor.svg"}
                  alt={"vendor button"}
                  path={"/"}
                />
              </ul>
            ))}
        </div>
      </div>
      <nav className="flex justify-center gap-12">
        <ul className="flex gap-10">
          <div
            className={`flex items-center gap-2 font-extralight relative ${categoryDropdown ? "text-primary1" : ""
              }`}
            onClick={handleCategoryToggle}
          >
            All categories
            <img
              src="/svg/icons/arrow-down.svg"
              alt="more-button"
              className={categoryDropdown ? "img-orange rotate-180" : ""}
            />
          </div>
          <NavLink path="/shop" text="Shop" />
          <NavLink path="/newIn" text="New in" />
          <NavLink path="/events" text="Events" />
          <NavLink path="/services" text="Services" />
          <NavLink path="" text="Charity" />
          <NavLink path="" text="Health" />
          <NavLink path="" text="Learning" />
          <NavLink path="" text="Sell on One-Stop" />
        </ul>
        <span className="text-primary1 flex items-center gap-2">
          <img src="/svg/icons/question.svg" alt="help button" />
          Need help
        </span>
      </nav>
      {categoryDropdown && <DropDown />}
    </div>
  );
};

export default Header;

const DropDown = () => {
  // State to manage the currently opened category
  const [openCategory, setOpenCategory] = useState(null);

  // Function to toggle the currently opened category
  const handleToggle = (category) => {
    setOpenCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const Category = ({ text, category }) => (
    <div
      className={`flex items-center gap-5 justify-between font-[400] text-sm cursor-pointer ${openCategory === category ? "text-primary1" : ""
        }`}
      onClick={() => handleToggle(category)}
    >
      {text}
      <img
        src="/svg/icons/arrow-down.svg"
        alt="more-button"
        className={
          openCategory === category ? "img-orange -rotate-90" : "-rotate-90"
        }
      />
    </div>
  );

  return (
    <div className="flex w-fit pt-7 pb-10 bg-white absolute top-[100%] left-[120px] z-10 rounded-b-lg shadow-lg">
      <div className="flex flex-col gap-6 w-fit px-10">
        <Category text="Baby Clothing" category="babyClothing" />
        <Category text="Changing / Bathing" category="changingBathing" />
        <Category text="Mother" category="mother" />
        <Category text="Play / Activity" category="playActivity" />
        <Category text="Sleeping" category="sleeping" />
        <Category text="Feeding" category="feeding" />
      </div>

      {Object.keys(subCategory).map(
        (category) =>
          openCategory === category && (
            <div
              key={category}
              className="text-left flex px-10 flex-wrap gap-y-5 h-fit border-l"
            >
              {subCategory[category].map((sub, index) => (
                <div key={index} className="flex flex-col gap-1.5 basis-1/3">
                  <h3 className="text-lg font-[400]">{sub.title}</h3>
                  <ul className="flex flex-col gap-0.5 list-none font-extralight text-sm">
                    <li>
                      <Link
                        href="/"
                        className="hover:underline hover:text-primary1"
                      >
                        {sub.sub1}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="hover:underline hover:text-primary1"
                      >
                        {sub.sub2}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="hover:underline hover:text-primary1"
                      >
                        {sub.sub3}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          )
      )}
    </div>
  );
};
