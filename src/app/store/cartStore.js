import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "./authStore";
import { toast } from "react-toastify";

const useCartStore = create(
  persist(
    (set, get) => ({
      color: "",
      price: 0,
      size: "",
      inStock: 0,
      quantity: 1,
      cart: [],
      productName: "",
      subTotal: 0,
      orderTotal: 0,
      shippingInfo: null,
      paymentMethod: "",
      orderDetails: null,
      selectedProperties: [],

      selectedColorA: (color) => set({ color }),
      selectedSizeA: (size) => set({ size }),
      quantityInStockA: (quantity) => set({ inStock: quantity }),
      selectedQuantityA: (quantity) => set({ quantity }),
      selectedPriceA: (price) => set({ price }),
      selectedProductNameA: (productName) => set({ productName }),
      setSubTotalA: (subTotalA) => set({ subTotal: subTotalA }),
      setOrderTotalA: (orderTotal) => set({ orderTotal }),
      setShippingInfo: (shippingInfo) => {
        localStorage.setItem("shipping_info", JSON.stringify(shippingInfo));
        set({ shippingInfo });
      },
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      setOrderDetails: (orderDetails) => set({ orderDetails }),
      setSelectedProperties: (properties) => {
        set({ selectedProperties: properties });
      },

      incrementQuantity: () => {
        set((state) => {
          if (state.quantity < state.inStock) {
            return { quantity: state.quantity + 1 };
          }
          return state;
        });
      },

      decrementQuantity: () => {
        set((state) => {
          if (state.quantity > 1) {
            return { quantity: state.quantity - 1 };
          }
          return state;
        });
      },

      addToCart: (newOrder) => {
        console.log("here", newOrder);
        if (newOrder.product_name === "") {
          return toast.warn("Select size and color");
        }
        set((state) => {
          const existingProductIndex = state.cart.findIndex((item) => {
            if (item._id !== newOrder._id) return false;
            return item.selected_properties.every((prop, index) => {
              const newOrderProp = newOrder.selected_properties[index];
              return (
                prop.color === newOrderProp.color &&
                prop.size === newOrderProp.size
              );
            });
          });
          let updatedCart;
          if (existingProductIndex !== -1) {
            updatedCart = [...state.cart];
            updatedCart[existingProductIndex].selected_properties.forEach(
              (prop, index) => {
                prop.quantity += newOrder.selected_properties[index].quantity;
              }
            );
          } else {
            updatedCart = [...state.cart, newOrder];
          }
          toast.success("Item added to cart!");
          return { cart: updatedCart, quantity: 1 };
        });
        // set((state) => {
        //     const existingProductIndex = state.cart.findIndex(
        //         (item) =>
        //         item._id === newOrder._id &&
        //         item.selected_properties.reduce(
        //             (acc, prop) => acc + prop.color,
        //             ""
        //         ) ===
        //         newOrder.selected_properties.reduce(
        //             (acc, prop) => acc + prop.color,
        //             ""
        //         ) &&
        //         item.selected_properties.reduce(
        //             (acc, prop) => acc + prop.size,
        //             ""
        //         ) ===
        //         newOrder.selected_properties.reduce(
        //             (acc, prop) => acc + prop.size,
        //             ""
        //         )
        //     );
        //     let updatedCart;
        //     if (existingProductIndex !== -1) {
        //         updatedCart = [...state.cart];
        //         updatedCart[existingProductIndex].selected_properties.quantity +=
        //             newOrder.selected_properties.quantity;
        //     } else {
        //         updatedCart = [...state.cart, newOrder];
        //     }
        //     localStorage.setItem("cart", JSON.stringify(updatedCart));
        //     toast.success("Item added to cart!");
        //     return { cart: updatedCart, quantity: 1 };
        // });
      },

      removeFromCart: (id, color, size) =>
        set((state) => {
          const updatedCart = state.cart
            .map((item) => {
              if (item._id === id) {
                const filteredProperties = item.selected_properties.filter(
                  (prop) => !(prop.color === color && prop.size === size)
                );

                if (filteredProperties.length === 0) {
                  return null;
                }

                return { ...item, selected_properties: filteredProperties };
              }
              return item;
            })
            .filter(Boolean);

          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return { cart: updatedCart };
        }),

      cartCount: () => {
        return get().cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      clearCart: () => set({ cart: [] }),

      postOrder: async (details) => {
        try {
          set({ loading: true });
          await axios.post(`${BASE_URL}cart`, details);
          console.log(details)
        set({loading: false})
        } catch (error) {
          console.log("error loading data");
          set({ loading: false, error });
        }
      },

      resetProductState: () =>
        set({
          size: "",
          color: "",
          quantity: 1,
          price: 0,
          productName: "",
          inStock: 0,
          selectedProperties: [],
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;