import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const BASE_URL = "https://private-api-service-server.onrender.com/altaria/v1/";
const SIGN_UP = `${BASE_URL}signup`;
const LOG_IN = `${BASE_URL}login`;
const VERIFY_OTP = `${BASE_URL}verify/otp`;
const RESEND_OTP = `${BASE_URL}resend/otp`;
const RESET_OTP = `${BASE_URL}request/resetPassword/otp`;
const VERIFY_RESET_OTP = `${BASE_URL}verify/resetPassword/otp`;
const RESET_PWD = `${BASE_URL}resetPassword`;

const useAuthStore = create(
  persist(
    (set) => ({
      signedIn: false,
      token: null,
      loading: false,
      email: "",
      user: null,
      loginType: null,

      register: async ({ first_name, last_name, email, password }) => {
        try {
          const data = { first_name, last_name, email, password };
          set({ loading: true });
          const response = await axios.post(SIGN_UP, data);
          console.log(response.data.message);
          toast.success(response.data.message);
          set({ loading: false });
        } catch (error) {
          set({ loading: false });
          toast.error("Kindly register again");
          console.error(error);
        }
      },

      login: async ({ email, password }) => {
        try {
          const data = { email, password };
          set({ loading: true });
          const response = await axios.post(LOG_IN, data);
          const message = response.data.message;
          if (
            message === "Authentication successful. OTP sent to your email."
          ) {
            toast.success(message);
          } else {
            toast.error(message);
          }
          set({ loading: false, email: email });
        } catch (error) {
          set({ loading: false });
          if (error.response && error.response.status === 400) {
            toast.error("Invalid credentials");
          } else if (error.response && error.response.status === 500) {
            toast.error("Internal server error");
          } else {
            toast.error("An unexpected error occurred.");
          }
          console.error(error);
        }
      },

      verifyOTP: async ({ email, otp }) => {
        try {
          const data = { email, otp };
          set({ loading: true, signedIn: false, user: null });
          const response = await axios.post(VERIFY_OTP, data);
          const token = response.data.token;
          const user = response.data.first_name;
          if (response.data.message === "OTP verified successfully.") {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
            console.log(user);
            set({ loading: false, signedIn: true, user: user, token: token });
            return true;
          } else {
            toast.error(response.data.message);
            set({ loading: false });
            return false;
          }
        } catch (error) {
          console.log(error);
          toast.error("Invalid OTP");
          set({ loading: false });
          return false;
        }
      },


      resendOtp: async ({ email }) => {
        try {
          set({ loading: true });
          const response = await axios.post(RESEND_OTP, { email });
          console.log(response);
          toast.success(response.data.message);
          set({ loading: false });
        } catch (error) {
          console.log(error);
          toast.error("Request Failed. Kindly Retry");
          set({ loading: false });
        }
      },

      resetOTP: async ({ email }) => {
        try {
          const data = { email };
          const response = await axios.post(RESET_OTP, data);
          set({ loading: true });
          toast.success("OTP verified succcessfully.");
          set({ loading: false });
        } catch (error) {
          console.log(error);
          toast.error("Request Failed. Kindly Retry");
          set({ loading: false });
        }
      },

      verifyResetOTP: async ({ email, otp }) => {
        try {
          const data = { email, otp };
          const response = await axios.post(VERIFY_RESET_OTP, data);
          set({ loading: true });
          toast.success(response.data.message);
          set({ loading: false });
        } catch (error) {
          console.log(error);
          toast.error("Request Failed. Kindly Retry");
          set({ loading: false });
        }
      },

      resetPWD: async ({ email, password }) => {
        try {
          const data = { email, password };
          const response = await axios.post(RESET_PWD, data);
          set({ loading: true });
          toast.success(response.data.message);
          set({ loading: false });
        } catch (error) {
          console.log(error);
          toast.error("Request Failed. Kindly Retry");
          set({ loading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null, signedIn: false });
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
      },
    }),

    {
      name: "auth",
      storage: createJSONStorage(() => localStorage), // Or other storage mechanism
    }
  )
);

export { useAuthStore, BASE_URL };