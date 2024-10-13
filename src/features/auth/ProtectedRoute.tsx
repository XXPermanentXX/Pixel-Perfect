import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [cookies] = useCookies(["admin_key"]);

  return cookies.admin_key ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
