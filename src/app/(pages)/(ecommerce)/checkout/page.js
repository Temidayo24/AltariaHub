"use client";
import useCartStore from "@/app/store/cartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PaystackButton } from "react-paystack";

const Checkout = () => {
  const {
    cart,
    subTotal,
    orderTotal,
    formData,
    setFormData,
    paymentMethod,
    setPaymentMethod,
    setOrderDetails,
    postOrder,
  } = useCartStore((state) => ({
    cart: state.cart,
    subTotal: state.subTotal,
    orderTotal: state.orderTotal,
    formData: state.shippingInfo,
    setFormData: state.setShippingInfo,
    paymentMethod: state.paymentMethod,
    setPaymentMethod: state.setPaymentMethod,
    setOrderDetails: state.setOrderDetails,
    postOrder: state.postOrder,
  }));
  const {
    handleSubmit,
    reset,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();
  const router = useRouter();

  const publicKeyPaystack = "pk_test_df34f094282224d0ead6c677f49e0a26f9ddbddd";
  const publicKeyFlutter = "FLWPUBK_TEST-fc522f9210982d71048113af426e6939-X";
  const amount = Math.floor(orderTotal * 100);

  const onSubmit = (data) => {
    const { fName, lName, email, address, region, city, phoneNumber } = data;
    const name = `${fName} ${lName}`;
    const fullAddress = `${address}, ${region}, ${city}.`;
    const deliveryInfo = {
      name: name,
      address: fullAddress,
      phoneNumber: phoneNumber,
      email: email,
    };
    setFormData(deliveryInfo);
  };

  // const [submitting, setIsSubmitting] = useState(false);

 useEffect(() => {
   setFormData(formData || {});
   setPaymentMethod("paystack"); // Set Paystack as the default payment method on page load
 }, [setFormData, formData, setPaymentMethod]);

  const generateOrderId = (name) => {
    const namePart = name.slice(0, 3).toUpperCase();
    const datePart = new Date().toISOString().slice(0, 6).replace(/-/g, "");
    const orderId = `${namePart}${datePart}ALT`;
    return orderId;
  };

  const emailA = getValues("email");

  const handlePaystackSuccessAction = (reference) => {
    const orderId = generateOrderId(formData.name);
    const details = {
      name_of_buyer: formData.name,
      email_of_buyer: formData.email,
      phone_number_of_buyer: formData.phoneNumber,
      address_of_buyer: formData.address,
      items: cart,
      total_price: orderTotal,
      source: "paystack",
      order_id: orderId,
      ref: {
        reference: reference.reference,
        status: reference.status,
      },
    };
    console.log("details are ", details);
    setOrderDetails(details);
    postOrder(details);
    useCartStore.getState().clearCart();
    router.push("/thankyou");
  };

  const handlePaystackCloseAction = () => {
    console.log("closed");
  };

  const componentProps = {
    email: emailA,
    amount: amount,
    reference: new Date().getTime().toString(),
    publicKey: publicKeyPaystack,
    text: "Proceed with Paystack",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  // const PaymentButton = () => {
  //   useEffect(() => {
  //     // Load the Flutterwave script
  //     const script = document.createElement('script');
  //     script.src = 'https://checkout.flutterwave.com/v3.js';
  //     script.async = true;
  //     document.body.appendChild(script);
  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);

  //   const handlePayment = () => {
  //     FlutterwaveCheckout({
  //       public_key: 'YOUR_PUBLIC_KEY_HERE',
  //       tx_ref: `tx-${Date.now()}`,
  //       amount: 100,
  //       currency: 'NGN',
  //       payment_options: 'card, banktransfer, ussd',
  //       redirect_url: '/payment-response',
  //       customer: {
  //         email: 'user@example.com',
  //         phonenumber: '080****4528',
  //         name: 'Yemi Desola',
  //       },
  //       customizations: {
  //         title: 'My Store',
  //         description: 'Payment for items in cart',
  //         logo: 'https://yourcompany.com/logo.png',
  //       },
  //       callback: (data) => {
  //         // Extract only the necessary data
  //         const { status, tx_ref, transaction_id, currency, amount } = data;
  //         const specificData = {
  //           status,
  //           tx_ref,
  //           transaction_id,
  //           currency,
  //           amount,
  //         };

  //         // Send the specific data to your backend for processing
  //         fetch('https://your-backend-url.com/api/process-payment', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(specificData),
  //         })
  //           .then((response) => response.json())
  //           .then((data) => console.log(data))
  //           .catch((error) => console.error(error));
  //       },
  //       onclose: () => {
  //         // Handle what to do when the modal is closed
  //       },
  //     });
  //   };

  //   return <button onClick={handlePayment}>Pay Now</button>;
  // };

  const handleEdit = () => {
    !isSubmitted;
    console.log(!isSubmitted);
  };

  return (
    <div className="flex gap-28 mt-36">
      <div className="flex flex-col gap-10 w-[500px]">
        <div className="flex flex-col gap-5">
          <div className="font-medium text-lg flex justify-between items-center">
            Shipping Information{" "}
            {isSubmitted ? (
              <div
                className="text-primary1 underline text-sm cursor-pointer"
                onClick={handleEdit()}
              >
                Edit
              </div>
            ) : (
              ""
            )}
          </div>
          {!isSubmitted ? (
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="fName"
                      className="text-[13px] text-black text-opacity-70"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Segun"
                      name="fName"
                      {...register("fName", { required: true })}
                      className="border h-7 rounded px-2 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="lName"
                      className="text-[13px] text-black text-opacity-70"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Benson"
                      name="fName"
                      {...register("lName", { required: true })}
                      className="border h-7 rounded px-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="phoneNumber"
                      className="text-[13px] text-black text-opacity-70"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      placeholder="+234 803 123 4567"
                      name="phoneNumber"
                      {...register("phoneNumber", { required: true })}
                      className="border h-7 rounded px-2 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="phoneNumber2"
                      className="text-[13px] text-black text-opacity-70"
                    >
                      Additional Phone number
                    </label>
                    <input
                      type="text"
                      placeholder="+234 803 123 4567"
                      name="phoneNumber2"
                      {...register("phoneNumber2", { required: false })}
                      className="border h-7 rounded px-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="email"
                      className="text-[13px] text-black text-opacity-70"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="segunbenson@gmail.com"
                      name="email"
                      {...register("email", { required: true })}
                      className="border h-7 rounded px-2 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="address"
                      className="text-[13px] text-black text-opacity-70"
                    >
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      placeholder="Address"
                      name="address"
                      {...register("address", { required: true })}
                      className="border h-7 rounded px-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="region"
                      className="text-[13px] text-black text-opacity-70"
                    >
                      Region
                    </label>
                    <input
                      type="text"
                      placeholder="Mushin"
                      name="region"
                      {...register("region", { required: true })}
                      className="border h-7 rounded px-2 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="city"
                      className="text-[13px] text-black text-opacity-70"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="lagos"
                      name="city"
                      {...register("city", { required: true })}
                      className="border h-7 rounded px-2 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <div
                  className="text-primary1 text-sm px-3 rounded-lg h-8 flex items-center"
                  onClick={reset}
                >
                  Cancel
                </div>
                <button className="text-white text-sm px-3 rounded-lg h-8 bg-primary1">
                  Send
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-10  font-medium bg-gray-100 p-4">
              <div className="flex gap-9">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-0">
                    <p className="text-sm text-black text-opacity-60">Name</p>
                    <p className="text-[15px]">{formData.name}</p>
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm text-black text-opacity-60">
                      Phone Number
                    </p>
                    <p className="text-[15px]">{formData.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-0">
                    <p className="text-sm text-black text-opacity-60">
                      Address
                    </p>
                    <p className="text-[15px]">{formData.address}</p>
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm text-black text-opacity-60">
                      Email Address
                    </p>
                    <p className="text-[15px]">{formData.email}</p>
                  </div>
                </div>
              </div>
              {/* <button
                onClick={handleEdit}
                className="text-white text-sm px-3 rounded-lg h-8 bg-primary1"
              >
                Edit
              </button> */}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-medium text-lg">Delivery Method</span>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                name="delivery"
                onChange={(e) => e.target.value}
                className="w-4 h-4 accent-primary1 border"
              />
              <label htmlFor="delivery">
                Standard Shipping: Cost and estimated delivery time
              </label>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                name="delivery"
                onChange={(e) => e.target.value}
                className="w-4 h-4 accent-primary1 border"
              />
              <label htmlFor="delivery">
                Expedited Shipping: Cost and estimated delivery time
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">Payment Method</span>
          <div className="flex flex-col gap-2 text-[13px] text-black text-opacity-80">
            All transactions are secured and encrypted
          </div>
          <div className="border rounded px-3 mt-2">
            <div className="flex justify-between py-3 border-b">
              <div className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="payment"
                  onChange={() => setPaymentMethod("paystack")}
                  className="w-4 h-4 accent-primary1 border"
                />
                <label htmlFor="paystack">Paystack</label>
              </div>
              <Image
                src={"/svg/icons/paystack2.svg"}
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div className="flex justify-between py-3">
              <div className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="payment"
                  onChange={() => setPaymentMethod("flutter")}
                  className="w-4 h-4 accent-primary1 border"
                />
                <label htmlFor="flutter">Flutter</label>
              </div>
              <Image
                src={"/svg/icons/flutterwave.svg"}
                alt=""
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-4 border rounded-lg p-4">
          <span className="font-medium">Order Summary</span>
          <div className="flex flex-col gap-2 text-sm">
            <p className="flex justify-between">
              Subtotal <span>&#8358;{subTotal}</span>
            </p>
            <p className="flex justify-between">
              Estimated Delivery Fee<span>&#8358;0</span>
            </p>
            <p className="flex justify-between border-y py-2">
              Order Total{" "}
              <span className="font-bold text-base">&#8358;{orderTotal}</span>
            </p>
          </div>
          {paymentMethod === "flutter" ? (
            <button className="bg-primary1 text-white font-light text-sm rounded-md w-full h-8 px-2">
              Proceed to Flutter
            </button>
          ) : isSubmitting ? (
            <span className="border-white h-6 w-6 animate-spin rounded-full border-2 border-t-primary1"></span>
          ) : (
            <PaystackButton
              {...componentProps}
              className="bg-primary1 text-white font-light text-sm rounded-md w-full h-8 px-2"
            />
          )}
        </div>
        <div className="flex flex-col gap-4 border rounded-lg p-4">
          <span className="font-medium">Order Details</span>
          <div className="flex flex-col">
            {cart.map((data) => (
              <div key={data.id} className="flex gap-3 py-3">
                <Image
                  src={"/images/p2.jpg"}
                  alt=""
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-sm">{data.product_name}</p>
                  <p className="flex justify-between text-sm font-semibold">
                    &#8358;
                    {data.selected_properties.reduce(
                      (acc, prop) => acc + prop.price,
                      0
                    )}
                    <span className="text-black text-opacity-60 font-normal">
                      qty:
                      {data.selected_properties.reduce(
                        (acc, prop) => acc + prop.quantity,
                        ""
                      )}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
