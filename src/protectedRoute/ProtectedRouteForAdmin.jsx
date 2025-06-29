// ✅ src/protectedRoute/ProtectedRouteForAdmin.jsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth";

export const ProtectedRouteForAdmin = ({ children }) => {
  const { isAuth, user, isAppLoader } = useAuthContext();

  if (isAppLoader) return null;

  if (isAuth && user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
};
