// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { generateOrderId } from "../service/generateorderid";
// import {
//   cartDetails,
//   removeItem,
//   updateCart,
//   updateQuantity,
// } from "../reducers/cart";
// import { BsTrash } from "react-icons/bs";
// import {
//   FaMinus,
//   FaPlus,
//   FaChevronRight,
//   FaChevronLeft,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { toast } from "react-toastify";
// import moment from "moment";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";
// import TopBuy from "./TopBuy";
// import { emptyCart } from "../assets";
// import { PaystackButton } from "react-paystack";
// import { buyProductsNow } from "../reducers/products";

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const carts = useSelector(cartDetails);
//   // console.log("carts", carts);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [showDetails, setShowDetails] = useState(1);
//   const [pickup, setPickup] = useState(1);
//   const [timeOption, setTimeOption] = useState();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState();
//   const [phoneNumber, setPhoneNumber] = useState();
//   const [deliveryAddress, setDeliveryAddress] = useState("");

//   const [selectedOption, setSelectedOption] = useState();
//   const [isPickupAvailable, setIsPickupAvailable] = useState(true);

//   const itemsPerPage = 4;
//   const [paymentCompleted, setPaymentCompleted] = useState(false);

//   const publicKey = process.env.REACT_APP_MY_STACK_KEY;
//   let idforOrder;
//   if (name !== "") {
//     idforOrder = generateOrderId(name, "NYLONHUB");
//   } else {
//     idforOrder = generateOrderId("BUYER00", "NYLONHUB");
//   }

//   //create timeoptions.....
//   useEffect(() => {
//     const openingHour = 7;
//     const closingHour = 18; // 6:30 PM in 24-hour format

//     const currentTime = moment();
//     const currentHour = currentTime.hour();

//     if (currentHour < openingHour || currentHour >= closingHour) {
//       // Display message that pickup is not available
//       // console.log("Pickup is not available at this time");
//       setIsPickupAvailable(false);
//     } else {
//       // Allow pickup
//       console.log("Pickup is available");
//       setIsPickupAvailable(true);
//       const optionA = moment(currentTime).add(1, "hours").format("LT");
//       setTimeOption(optionA);
//     }

//     // Update the time option every minute
//     const intervalId = setInterval(() => {
//       const currentTime = moment();
//       const optionA = moment(currentTime).add(1, "hours").format("LT");
//       setTimeOption(optionA);
//     }, 30 * 1000);

//     // Clear the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, []);

//   //sum price..
//   const priceSummation = carts.reduce((accumulator, object) => {
//     return accumulator + object.totalCost;
//   }, 0);

//   const config = {
//     reference: new Date().getTime().toString(),
//     email: email,
//     amount: priceSummation * 100,
//     publicKey: publicKey,
//   };

//   const handlePaystackSuccessAction = (reference) => {
//     // Implementation for whatever you want to do with reference and after success call.
//     const details = {
//       name_of_buyer: name,
//       email_of_buyer: email,
//       phone_number_of_buyer: phoneNumber,
//       address_of_buyer: deliveryAddress,
//       items: carts,
//       total_price: priceSummation,
//       order_id: idforOrder,
//       ref: reference,
//     };
//     dispatch(buyProductsNow(details));
//   };
//   /**
//  * {
//   "name_of_buyer": "Bamigboye Oluwapelumi",
//   "email_of_buyer": "bamigboyepelumi@outlook.com",
//   "phone_number_of_buyer": "09124030557",
//   "address_of_buyer": "cameroun street",
//   "items": [
//     {
//       "name": "Gum Nylon 12 by 8",
//       "quantity": 2,
//       "description": "Description of Product 1",
//       "color": "Red",
//       "price": {
//         "real_price": 50,
//         "promo_price": 40
//       }
//     },
//     {
//       "name": "Packing pure water",
//       "quantity": 1,
//       "description": "Description of Product 2",
//       "color": "Blue",
//       "price": {
//         "real_price": 30,
//         "promo_price": 30
//       }
//     }
//   ],
//   "total_price": 15000,
//   "ref": "1711414420334",
//   "delivery_details" : "39, Iyalla Street"
// }

//  */
//   // you can call this function anything
//   const handlePaystackCloseAction = () => {
//     console.log("closed");
//   };
//   const componentProps = {
//     ...config,
//     text: "Pay now!",
//     onSuccess: (reference) => handlePaystackSuccessAction(reference),
//     onClose: handlePaystackCloseAction,
//   };

//   const detailsOrSummary = () => {
//     const isReviewButtonDisabled =
//       !name ||
//       !email ||
//       !phoneNumber ||
//       (pickup === 0 && !deliveryAddress) ||
//       deliveryAddress == "";
//     if (showDetails === 1) {
//       return (
//         <>
//           {/* <p>Hello</p> */}
//           <div className="px-5 py-5">
//             <input
//               value={name}
//               type="text"
//               placeholder="Name"
//               className="mb-5 w-full rounded-md"
//               onChange={(e) => setName(e.target.value)}
//             />
//             <br />
//             <input
//               value={email}
//               type="text"
//               placeholder="Email"
//               className="mb-5 w-full rounded-md"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <br />
//             <input
//               value={phoneNumber}
//               type="text"
//               placeholder="Phone number"
//               className="mb-5 w-full rounded-md"
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//             <br />
//             <div className=" my-2 " onClick={() => setPickup(1)}>
//               {pickup === 1 ? (
//                 <p className="font-bold text-nylon-hb-brown">
//                   Pick up or Delivery
//                 </p>
//               ) : (
//                 <p className=" my-2 font-bold text-nylon-hb-brown cursor-pointer">
//                   Delievery (click here to switch to pick up)
//                 </p>
//               )}
//             </div>
//             {pickup === 1 && isPickupAvailable ? (
//               <div className="text-sm">
//                 {" "}
//                 <input
//                   type="radio"
//                   className="  my-1"
//                   value={timeOption}
//                   onChange={() => setSelectedOption("pickup")}
//                 />
//                 <label for="html" className=" ml-1">
//                   Pickup by <b>{timeOption}</b> today
//                 </label>
//                 <br />
//                 <input
//                   type="radio"
//                   onClick={() => {
//                     setPickup(0);
//                     setSelectedOption("delivery");
//                   }}
//                 />
//                 <label for="" className="text-left ml-1">
//                   Delivery <b>(note: this will cost extra)</b>
//                 </label>
//               </div>
//             ) : (
//               <>
//                 {!isPickupAvailable && (
//                   <p className=" mb-2">
//                     Pickup is not available at this time <br /> Opening hours
//                     (9am - 6:30pm)
//                   </p>
//                 )}
//                 <input
//                   type="text"
//                   value={deliveryAddress}
//                   placeholder="Enter delievery address"
//                   className="mb-5 w-full rounded-md"
//                   onChange={(e) => setDeliveryAddress(e.target.value)}
//                 />
//               </>
//             )}
//             <br />
//             <button
//               onClick={() => setShowDetails(2)}
//               className="bg-nylon-hb-orange rounded-[200px] text-white w-full h-10 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={isReviewButtonDisabled}
//             >
//               Review
//             </button>
//           </div>
//         </>
//       );
//     } else if (showDetails === 2) {
//       return (
//         <>
//           <div className="px-5 font-sand text-sm">
//             <h1 onClick={() => setShowDetails(1)}>Order summary</h1>
//             <div className="my-2 flex justify-between items-center">
//               <h1 className="font-bold mt-2 mb-2">Order ID:</h1>
//               <h1 className="font-bold">{idforOrder}</h1>
//             </div>

//             {/* Display the order summary details */}
//             <div className="my-2 flex justify-between items-center">
//               <h1 className="font-bold mt-2 mb-2">Order date:</h1>
//               <h1 className="font-bold">{moment().format("MMMM Do YYYY")}</h1>
//             </div>
//             {pickup === 0 ? (
//               <div className="my-2 flex justify-between items-center">
//                 <h1 className="font-bold mt-2 mb-2">Delivery address:</h1>
//                 <h1 className="font-bold">{deliveryAddress}</h1>
//               </div>
//             ) : (
//               <p>Pickup</p>
//             )}
//             <div className="my-2 flex justify-between items-center">
//               <h1 className="font-bold">Customer Name:</h1>
//               <h1 className="font-bold">{name}</h1>
//             </div>
//             <div className="my-2 flex justify-between items-center">
//               <h1 className="font-bold mt-2 mb-2">Customer email:</h1>
//               <h1 className="font-bold">{email}</h1>
//             </div>
//             {/* Display the pickup time */}
//             {pickup === 1 && selectedOption === "pickup" && (
//               <div className="my-2 flex justify-between items-center">
//                 <h1 className="font-bold mt-2 mb-2">Pickup time:</h1>
//                 <h1 className="font-bold">{timeOption}</h1>
//               </div>
//             )}
//             {/* Loop through cart items */}
//             {carts.map((x) => (
//               <div className="mb-2 flex justify-between" key={x._id}>
//                 <h1 className="font-bold">
//                   {x.product_name}{" "}
//                   <span>
//                     {x.quantity} X 100PCS {x.selectedColor}
//                   </span>
//                 </h1>
//                 <h1 className="font-bold">{formatter.format(x.totalCost)}</h1>
//               </div>
//             ))}
//             <div className="flex justify-between items-center">
//               <h1 className="font-bold">Total cost</h1>
//               <h1 className="font-bold">{formatter.format(priceSummation)}</h1>
//             </div>
//           </div>

//           {/* Display the "Back" button and "Pay Now" button */}
//           <div className=" flex justify-center items-center mt-10 mx-3 mb-2 ">
//             <button
//               onClick={() => setShowDetails(1)}
//               className=" h-10 w-10 bg-nylon-hb-orange rounded-full mr-2 flex justify-center items-center text-white"
//             >
//               <FaArrowLeft />
//             </button>
//             {!paymentCompleted ? (
//               <button
//                 onClick={() => setShowDetails(2)}
//                 className="bg-nylon-hb-orange rounded-[200px] text-white min-w-[80%] h-10 "
//               >
//                 <PaystackButton {...componentProps} />
//               </button>
//             ) : (
//               <button className="bg-nylon-hb-orange rounded-[200px] text-black min-w-[80%] h-10">
//                 Payment successful! Thank you for your order.
//               </button>
//             )}
//           </div>
//         </>
//       );
//     }
//   };

//   const handleRemoveItem = (_id) => {
//     dispatch(removeItem(_id));

//     toast.success("Item removed from cart!", {
//       position: "top-right",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//     });
//     // Check if the current page is now empty
//     if (currentItems.length === 1 && currentPage > 1) {
//       // Go back to the previous page
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleUpdateItem = (item, value) => {
//     console.log("Item", item);
//     // Parse the value as an integer if it's a string
//     const newQuantity = typeof value === "string" ? parseInt(value) : value;

//     // Check if the parsed value is a valid number
//     if (!isNaN(newQuantity)) {
//       // Calculate the new total cost based on the item's price and the new quantity
//       const newTotalCost = item.product_cost.main * newQuantity;
//       console.log("Hello", newTotalCost);

//       // Dispatch the updateCart action with the updated values
//       dispatch(
//         updateCart({
//           _id: item._id, // ID of the item being updated
//           quantity: newQuantity, // Updated quantity
//           totalCost: newTotalCost, // Updated total cost
//         })
//       );
//     }
//   };

//   const formatter = new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   // Calculate the index of the first and last item on the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   // Slice the carts array to get only the items for the current page
//   const currentItems = carts.slice(indexOfFirstItem, indexOfLastItem);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(carts.length / itemsPerPage);

//   return (
//     <div className="pt-32 pb-12 px-7 lg:px-28  ">
//       <div className="lg:basis-[70%]">
//         {carts.length === 0 ? (
//           // Cart is empty, show message
//           <div className=" flex-col">
//             <div className="text-center w-full h-[50vh] items-center flex justify-center">
//               <div className=" flex flex-col">
//                 <div className=" my-3 animate-pulse">
//                   <img src={emptyCart} alt="empty" />
//                 </div>
//                 <h1 className=" font-bold text-xl">Your cart is empty </h1>
//                 <p className=" text-sm opacity-50">
//                   {" "}
//                   Looks like you haven't added <br /> anything to your cart yet
//                 </p>
//                 <Link to="/">
//                   <button className="bg-nylon-hb-brown text-white my-4 hover:bg-nylon-hb-orange-light hover:text-black p-2 px-5 transition-all duration-200 rounded-lg">
//                     Start Shopping
//                   </button>
//                 </Link>
//               </div>
//             </div>
//             <div>
//               <TopBuy />
//             </div>
//           </div>
//         ) : (
//           // Cart is not empty, show items
//           <div className=" flex lg:flex-row flex-col gap-10 font-sand lg:justify-between">
//             <ul className=" w-full max-w-3xl">
//               <h4 className=" text-sm">CART ITEMS ({carts?.length})</h4>
//               {/* <h1>CART SUMMARY</h1> */}
//               {currentItems?.map((item) => (
//                 <li key={item._id} className="flex flex-col my-5">
//                   <div className="sm:justify-between flex-col flex sm:flex-row am:items-center">
//                     {/* product details  */}
//                     <div className="flex gap-3">
//                       <img
//                         className="w-[5rem] h-[5rem] object-cover rounded-md"
//                         src="https://images.pexels.com/photos/7319324/pexels-photo-7319324.jpeg?auto=compress&cs=tinysrgb&w=600"
//                         alt=""
//                       />
//                       <div className="flex flex-col">
//                         <h1 className="sm:text-[20px] font-semibold">
//                           {item.product_name}
//                         </h1>
//                         <p className="sm:text-[15px] text-[12px]">
//                           {item.product_description}
//                         </p>
//                       </div>
//                     </div>

//                     {/* quantity and cost */}
//                     <div className="items-center justify-between sm:gap-x-8 flex sm:flex-row flex-row-reverse sm:mt-0 mt-[20px]">
//                       <div className="items-center flex gap-x-3">
//                         {/* Disable input field when in order summary */}
//                         {showDetails !== 2 ? (
//                           <>
//                             <button
//                               className="disabled:text-gray-200"
//                               onClick={() =>
//                                 handleUpdateItem(item, item.quantity - 1)
//                               }
//                               disabled={item.quantity === 1}
//                             >
//                               <FaMinus size={20} /> {/* Minus icon */}
//                             </button>
//                             <input
//                               type="number"
//                               value={item.quantity}
//                               onChange={(e) =>
//                                 handleUpdateItem(item, e.target.value)
//                               }
//                               className="flex items-center outline-none bg-[#D9D9D9] p-2 sm:h-[40px] sm:w-[80px] h-[25px] w-[65px] justify-center font-bold text-[16px] rounded-full active:outline-0"
//                             />
//                             <button
//                               onClick={() =>
//                                 handleUpdateItem(item, item.quantity + 1)
//                               }
//                             >
//                               <FaPlus size={20} /> {/* Plus icon */}
//                             </button>
//                           </>
//                         ) : (
//                           <span>{item.quantity}</span>
//                         )}
//                       </div>
//                       <div>{formatter.format(item.totalCost)}</div>
//                     </div>
//                   </div>
//                   <div>
//                     <button
//                       className="flex my-2 items-center gap-2 hover:bg-nylon-hb-orange-light p-2 transition-all duration-200 rounded-lg active:bg-nylon-hb-orange"
//                       onClick={() => handleRemoveItem(item._id)}
//                     >
//                       <BsTrash />
//                       Remove
//                     </button>
//                   </div>

//                   <hr className="border-b-[1px] border-gray-200" />
//                 </li>
//               ))}

//               {/* Only show pagination controls if there are more than 4 items in the cart */}
//               {carts.length > 4 && (
//                 <div className="flex justify-center my-4">
//                   <button
//                     className=" bg-nylon-hb-brown text-white h-[30px] w-[30px] flex justify-center items-center p-1 rounded-full disabled:bg-gray-400 transition-all duration-200"
//                     onClick={() => setCurrentPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   >
//                     <FaChevronLeft />
//                   </button>
//                   <span className="mx-2">
//                     {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     className=" bg-nylon-hb-brown text-white h-[30px] w-[30px] flex justify-center items-center p-1 rounded-full disabled:bg-gray-400 transition-all duration-200"
//                     onClick={() => setCurrentPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                   >
//                     <FaChevronRight />
//                   </button>
//                 </div>
//               )}
//             </ul>

//             <div className="lg:basis-[30%]  shadow-md min-w-[300px]">
//               {/* <p>Back in business</p> */}
//               {detailsOrSummary()}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkout;
