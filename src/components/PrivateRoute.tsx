import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import { useTokenStore } from "store/useTokenStore";

const PrivateRoute: FC<{
  element: React.ReactElement;
}> = ({ element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { refreshAccessToken } = useTokenStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        refreshAccessToken();
      }
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(interval);
  }, []);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
