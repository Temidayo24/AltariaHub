import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "./authStore";
import { toast } from "react-toastify";

const useEventStore = create(
  persist(
    (set, get) => ({
      events: [],
      event: [],
      featuredEvents: [],
      loading: false,
      error: null,
      order: null,

      fetchEvents: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${BASE_URL}get/events`);
          const data = response.data?.events || [];
          set({ events: data, loading: false });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
          toast.error(`Failed to fetch events: ${errorMessage}`);
        }
      },

      fetchFeaturedEvents: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${BASE_URL}get/featuredEvents`);
          const data = response.data?.events || [];
          set({ featuredEvents: data, loading: false });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
          toast.error(`Failed to fetch events: ${errorMessage}`);
        }
      },

      fetchEventByID: async (event) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${BASE_URL}search/event`, {
            event_id: event,
          });
          const data = response.data.events || [];
          set({ event: data, loading: false });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
          toast.error(`Failed to fetch events: ${errorMessage}`);
        }
      },

      filterEvents: async ({
        location,
        ageGroup,
        priceRange,
        startDate,
        endDate,
        eventType,
      }) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${BASE_URL}search/event`, {
            price_range: priceRange,
            age_group: ageGroup,
            event_type: eventType,
            date_range: {
              start_date: startDate,
              end_date: endDate,
            },
            location: {
              city: location,
            },
          });
          const data = response.data.events || [];
          console.log(data)
          set({ events: data, loading: false });
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ loading: false, error: errorMessage });
          toast.error(`${errorMessage}`);
        }
      },

      setOrder: (order) => set({ order }),
    }),

    {
      name: "event-storage",
    }
  )
);

export default useEventStore;
