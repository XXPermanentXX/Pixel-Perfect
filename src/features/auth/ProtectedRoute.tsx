
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(["admin_key"]);

  return cookies.admin_key ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
