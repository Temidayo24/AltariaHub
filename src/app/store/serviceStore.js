import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BASE_URL } from "./authStore";
import axios from "axios";
import { toast } from "react-toastify";

const useServiceStore = create(
  persist(
    (set, get) => ({
      services: [],
      loading: false,
      error: null,

      fetchServices: async ({ service_id = "", service_type = "" } = {}) => {
        try {
          set({ loading: true });

          const response = await axios.post(`${BASE_URL}search/service`, {
            service_id,
            service_type,
          });
          const data = response.data.services || [];
          set({ services: data, loading: false });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
          toast.error(`Failed to fetch services: ${errorMessage}`);
        }
      },
    }),
    { name: "service-store" }
  )
);

export default useServiceStore;
