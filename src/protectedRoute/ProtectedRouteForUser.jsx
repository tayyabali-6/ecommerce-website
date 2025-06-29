/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth";

export const ProtectedRouteForUser = ({ children }) => {
  const { isAuth, user, isAppLoader } = useAuthContext();

  if (isAppLoader) return null; // Ya loader return karo

  if (isAuth && user.role === "user") {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
};
