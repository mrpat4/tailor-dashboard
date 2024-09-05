import axios from "axios";
import apiEndpoints from "configs/apiEndPoints";
import Cookies from "universal-cookie";
import toastFunc from "utils/toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const cookies = new Cookies();

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  removeTokens: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useTokenStore = create<TokenState>((set) => ({
  accessToken: cookies.get("accessToken") || null,
  refreshToken: cookies.get("refreshToken") || null,
  setTokens: (accessToken: string, refreshToken: string) => {
    cookies.set("accessToken", accessToken, { path: "/" });
    cookies.set("refreshToken", refreshToken, { path: "/" });
    set({ accessToken, refreshToken });
  },
  removeTokens: () => {
    cookies.remove("accessToken", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
    set({ accessToken: null, refreshToken: null });
  },
  refreshAccessToken: async () => {
    try {
      const refreshToken = cookies.get("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post(apiEndpoints.host + apiEndpoints.refreshToken);
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      console.log("🚀 ~ refreshAccessToken: ~ response:", response);
      cookies.set("accessToken", accessToken, { path: "/" });
      if (newRefreshToken) {
        cookies.set("refreshToken", newRefreshToken, { path: "/" });
        set({ refreshToken: newRefreshToken, accessToken: accessToken });
      }
      set({ accessToken });
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      toastFunc.error({ title: "Please login again" });
      useAuthStore.getState().logout();
    }
  },
}));
