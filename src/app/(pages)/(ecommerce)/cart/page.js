"use client";
import useProductsStore from "@/app/store/productsStore";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/app/store/cartStore";
import { toast } from "react-toastify";
import EmblaCarousel from "@/app/components/Carousel";

const BestSellers = () => {
  const bestSellers = useProductsStore((state) => state.bestSellers);
  const OPTIONS = { align: "start", dragFree: true, loop: true };


  return (
   <EmblaCarousel slides={bestSellers} options={OPTIONS} />
  );
};

const Cart = () => {
  const {
    cart,
    removeFromCart,
    orderTotal,
    subTotal,
    setOrderTotal,
    setSubTotal,
  } = useCartStore((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    setOrderTotal: state.setOrderTotalA,
    setSubTotal: state.setSubTotalA,
    subTotal: state.subTotal,
    orderTotal: state.orderTotal,
  }));

  const router = useRouter();

  useEffect(() => {
    // Calculate subtotal and total whenever the cart changes
    const calculateSubtotal = () => {
      const subOrder = cart
        .reduce((total, item) => {
          return (
            total +
            item.selected_properties.reduce((propTotal, prop) => {
              return propTotal + prop.price * prop.quantity;
            }, 0)
          );
        }, 0)
        .toFixed(2);
      setSubTotal(subOrder);
      return subOrder;
    };

    const deliveryFee = 0;

    const calculateTotal = () => {
      const tOrder = (parseFloat(calculateSubtotal()) + deliveryFee).toFixed(2);
      setOrderTotal(tOrder);
      return tOrder;
    };

    calculateSubtotal();
    calculateTotal();
  }, [cart, setSubTotal, setOrderTotal]);

  const handleRemove = (id, color, size) => {
    removeFromCart(id, color, size);
    toast.success("Item removed from cart!");
  };

  const continueToCheckOut = () => {
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-16  mt-36">
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex gap-20">
          <div className="flex flex-col gap-6">
            <span className="text-xl font-medium">Cart</span>
            <div className="flex flex-col gap-4">
              {cart.map((data) => {
                const p = data.selected_properties.reduce(
                  (acc, prop) => acc + prop.price,
                  0
                );

                const q = data.selected_properties.reduce(
                  (acc, prop) => acc + prop.quantity,
                  ""
                );

                const s = data.selected_properties.reduce(
                  (acc, prop) => acc + prop.size,
                  ""
                );

                const c = data.selected_properties.reduce(
                  (acc, prop) => acc + prop.color,
                  ""
                );
                return (
                  <div key={data._id} className="flex flex-col h-full gap-3">
                    <div className="flex gap-4">
                      <Image
                        src={"/images/p2.jpg"}
                        alt=""
                        width={80}
                        height={80}
                        className="rounded"
                      />
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-[5px]">
                          <div className="flex justify-between gap-4 w-full text-[15px]">
                            <span className="w-full"> {data.product_name}</span>
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
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            <img
                              src="/svg/icons/heart.svg"
                              alt="add to wishlist"
                            />
                            <div className="text-primary1 underline text-sm">
                              Add to wishlist
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => handleRemove(data._id, c, s)}
                              className="underline text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-xl font-medium">Summary</span>
            <div className="flex flex-col gap-2">
              <label htmlFor="promo" className="text-xs font-medium">
                Do you have a Promo Code?
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  name="promo"
                  onChange={(e) => e.target.value}
                  required
                  className="border-2 h-7 rounded"
                />
                <button
                  type="submit"
                  className="bg-primary1 rounded px-3 text-white text-sm h-7 font-light"
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="text-sm flex flex-col gap-1">
              <div className="flex justify-between">
                Subtotal{" "}
                <span>
                  &#8358;
                  {subTotal}
                </span>
              </div>
              <div className="flex justify-between">
                Estimated Delivery Fee <span>&#8358;{(0.0).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              Total{" "}
              <span>
                &#8358;
                {orderTotal}
              </span>
            </div>
            <button
              className="flex items-center justify-center bg-primary1 text-white rounded font-light text-sm h-8 w-full"
              onClick={continueToCheckOut}
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <span className="text-2xl font-normal">Wishlist</span>
        <div>
          <BestSellers />
        </div>
      </div>
    </div>
  );
};

export default Cart;
