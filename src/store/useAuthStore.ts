import axios from "axios";
import apiEndpoints from "configs/apiEndPoints";
import Cookies from "universal-cookie";
import { create } from "zustand";
import { useTokenStore } from "./useTokenStore";

const cookies = new Cookies();

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  isFetching: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: cookies.get("isAuthenticated") || false,
  userEmail: cookies.get("userEmail") || null,
  isFetching: false,
  login: async (email: string, password: string) => {
    set({ isFetching: true });
    try {
      const response = await axios.post(apiEndpoints.host + apiEndpoints.login, {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      cookies.set("accessToken", accessToken, { path: "/" });
      cookies.set("refreshToken", refreshToken, { path: "/" });
      cookies.set("isAuthenticated", true, { path: "/" });
      cookies.set("userEmail", email, { path: "/" });
      set({
        isAuthenticated: true,
        userEmail: email,
        isFetching: false,
      });
      useTokenStore.getState().setTokens(accessToken, refreshToken);
    } catch (error) {
      set({ isFetching: false });
      console.error("Login failed:", error);
    }
  },
  logout: () => {
    cookies.remove("accessToken", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
    cookies.remove("isAuthenticated", { path: "/" });
    cookies.remove("userEmail", { path: "/" });
    set({
      isAuthenticated: false,
      userEmail: null,
      isFetching: false,
    });
    useTokenStore.getState().removeTokens();
  },
}));
