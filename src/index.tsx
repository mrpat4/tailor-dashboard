import configureAxios from "configs/axiosConfig";
import i18n from "i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "store/useThemeStore";
import App from "./App";
import "./index.css";
import "utils/microAnimations.css";
import reportWebVitals from "./reportWebVitals";

const Index = () => {
  const { theme } = useThemeStore();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <App />
          <ToastContainer
            rtl={false}
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            theme={theme}
            // progress={false}
          />
        </I18nextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

configureAxios();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
