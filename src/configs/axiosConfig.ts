import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useTokenStore } from "store/useTokenStore";
import toastFunc from "utils/toast";
import apiEndpoints from "./apiEndPoints";

const configureAxios = () => {
  // Set base URL and common headers
  axios.defaults.baseURL = apiEndpoints.host;
  axios.defaults.headers.common["Accept-Language"] = "en";

  // Add a request interceptor to dynamically add the Authorization header
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { accessToken } = useTokenStore.getState();
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      console.error({ axiosError: error });

      if (error?.response?.status === 401) {
        const { removeTokens } = useTokenStore.getState();
        removeTokens();
        toastFunc.error({ title: "Unauthorized access. Please log in again." });
      } else if (error?.response?.status === 403) {
        toastFunc.error({
          title: "Forbidden access. You do not have permission to perform this action.",
        });
      } else if ((error.response?.data as { message: string })?.message) {
        toastFunc.error({ title: (error.response?.data as { message: string }).message });
      } else {
        toastFunc.error({ title: "An unexpected error occurred. Please try again later." });
      }
      return Promise.reject(error);
    }
  );
};

export default configureAxios;
