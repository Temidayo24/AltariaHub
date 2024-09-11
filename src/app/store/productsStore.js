import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "./authStore";
import { toast } from "react-toastify";

const URL = BASE_URL;
const BEST_SELLERS = `${URL}best-selling/products`;
const NEW_ARRIVALS = `${URL}new-arrivals/products`;
const THRIFT_ITEMS = `${URL}search/products?condition=thrift`;
const TOP_CATEGORIES = `${URL}categories/top`;
const SUB_CATEGORIES = `${URL}categories`;
const RELATED_PRODUCTS = `${URL}related/`;
const ADD_TO_WISHLIST = `${URL}addToWishlist`;
const ADD_TO_REGISTRY = `${URL}addIntoRegistry`;
const CREATE_REGISTRY = `${URL}create/registry`;
const FETCH_REGISTRY = `${URL}usersRegistry`;


const sortProducts = (products = [], criteria) => {
  switch (criteria) {
    case "bestSelling":
      return [...products].sort((a, b) => b.sales - a.sales); // Replace `sales` with your metric
    case "newArrivals":
      return [...products].sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    case "thriftedItems":
      return products.filter((product) => product.condition === "thrift");
    default:
      return products;
  }
};

const useProductsStore = create(
  persist(
    (set, get) => ({
      topCategories: [],
      bestSellers: [],
      newArrivals: [],
      thriftedItems: [],
      filteredProducts: [],
      allProducts: [],
      product: [],
      relatedProducts: [],
      loading: false,
      error: null,
      productSection: "description",
      sortBy: null,
      subCategory: [],
      limit: 20,
      query: "",
      registries: [],

      fetchProductDetails: async ({
        query,
        limit,
        condition = "",
        category = "",
        priceRange = ""
      }) => {
        try {
          set({ loading: true });
          const categoryQuery = category ? `&category=${category}` : "";
          const conditionQuery = condition ? `&condition=${condition}` : "";
          const priceRangeQuery = priceRange ? `&price_range=${priceRange}` : "";
          const response = await axios.get(
            `${URL}search/products?query=${query}${conditionQuery}${categoryQuery}${priceRangeQuery}&limit=${limit}`
          );
          const products = response.data.data;
          set({
            loading: false,
            allProducts: products,
            filteredProducts: products,
            query: query,
          });
        } catch (error) {
          console.log("error loading data");
          set({ loading: false, error });
        }
      },

      setPage: (page) => set({ currentPage: page }),

      setSortBy: (criteria) => {
        set({ sortBy: criteria }, () => {
          const { filteredProducts, sortBy } = get();
          const sortedProducts = sortProducts(filteredProducts, sortBy);
          set({ filteredProducts: sortedProducts });
        });
      },

      fetchProductByID: async (id) => {
        try {
          set({ loading: true });
          const response = await axios.get(
            `https://private-api-service-server.onrender.com/altaria/v1/search/products?product_id=${id}`
          );
          const product = response.data.data;
          set({
            loading: false,
            product: product,
            error: response.status,
          });
        } catch (error) {
          console.log("error loading data", error);
          set({ loading: false, error });
        }
      },

      addToWishlist: async (product_id) => {
        try {
          set({ loading: true });
          const response = await axios.post(ADD_TO_WISHLIST, {
            product_id: product_id,
          });
          toast.success(response.message);
          set({
            loading: false,
            error: response.status,
          });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
          if (!errorMessage === "Authorization header is missing") {
            toast.error(errorMessage);
          }
        }
      },

      fetchRegistry: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(FETCH_REGISTRY);
          const registries = response.data.registries;
          set({
            registries: registries,
            loading: false,
            error: response.status,
          });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
           if (!errorMessage === "Authorization header is missing") {
             toast.error(errorMessage);
           }
        }
      },

      addToRegistry: async ({ product_id, registry_id }) => {
        try {
          set({ loading: true });
          const response = await axios.post(ADD_TO_REGISTRY, {
            product_id: product_id,
            registry_id: registry_id,
          });
          if (response.message === "Product is already in the registry") {
            toast.success("Product is already in the registry");
          } else if (
            response.message === "Product added to registry successfully"
          ) {
            toast.success("Product added to registry successfully");
          } else {
            toast.error(response.message);
          }
          set({
            loading: false,
            error: response.status,
          });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
          if (!errorMessage === "Authorization header is missing") {
            toast.error(errorMessage);
          }
        }
      },

      createRegistry: async ({
        name_of_creator,
        gift_registry,
        registry_name,
        event_date,
        registry_description,
      }) => {
        try {
          set({ loading: true });
          const response = await axios.post(CREATE_REGISTRY, {
            name_of_creator: name_of_creator,
            gift_registry: gift_registry,
            registry_name: registry_name,
            event_date: event_date,
            registry_description: registry_description,
          });
          set({
            loading: false,
            error: response.status,
          });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
          if (!errorMessage === "Authorization header is missing") {
            toast.error(errorMessage);
          }
        }
      },

      fetchRelatedProducts: async (productId) => {
        try {
          set({ loading: true });
          const response = await axios.get(`${RELATED_PRODUCTS}${productId}`);
          const products = response.data.data;
          set({
            loading: false,
            error: response.status,
            relatedProducts: products,
          });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
          toast.error(errorMessage);
        }
      },

      fetchBestSellers: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(BEST_SELLERS);
          const products = response.data.data;
          set({
            loading: false,
            bestSellers: products,
          });
        } catch (error) {
          set({ loading: false, error });
        }
      },

      fetchTopCategories: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(TOP_CATEGORIES);
          const products = response.data.data;
          set({
            loading: false,
            topCategories: products,
          });
        } catch (error) {
          set({ loading: false, error });
        }
      },

      fetchNewArrivals: async ({limit}) => {
        try {
          set({ loading: true });
          const response = await axios.get(`${NEW_ARRIVALS}?limit=${limit}`);
          const products = response.data.data;
          console.log(products);
          set({
            loading: false,
            newArrivals: products,
            allProducts: products,
            filteredProducts: products,
          });
        } catch (error) {
          set({ loading: false, error });
        }
      },

      fetchThriftItems: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(THRIFT_ITEMS);
          const products = response.data.data;
          set({
            loading: false,
            thriftedItems: products,
          });
        } catch (error) {
          set({ loading: false, error });
        }
      },

      selectedSection: (productSection) => set({ productSection }),
    }),
    {
      name: "product-storage",
    }
  )
);

export default useProductsStore;
