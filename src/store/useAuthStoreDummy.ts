import { create } from "zustand";

interface AuthState {
  username: string;
  password: string;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  username: localStorage.getItem("username") || "",
  password: localStorage.getItem("password") || "",
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  login: (username, password) => {
    if (username === "admin" && password === "password") {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("isAuthenticated", "true");
      set({ username, password, isAuthenticated: true });
    } else {
      alert("Invalid credentials");
    }
  },
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("isAuthenticated");
    set({ username: "", password: "", isAuthenticated: false });
  },
}));

export default useAuthStore;
