import { useSearchParams, useNavigate } from "react-router-dom";

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Helper to get a specific query parameter
  const getParam = (key: string) => searchParams.get(key) || "";

  // Helper to set or update query parameters
  const setParams = (params: Record<string, string | number | boolean>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value || value === 0) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  // Helper to remove a specific query parameter
  const removeParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(key);
    setSearchParams(newParams);
  };

  // Helper to replace the entire query string
  const replaceParams = (params: Record<string, string | number | boolean>) => {
    const newParams = new URLSearchParams(params as any);
    setSearchParams(newParams);
  };

  return {
    getParam,
    setParams,
    removeParam,
    replaceParams,
  };
}
