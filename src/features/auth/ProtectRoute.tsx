import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState} from "@/provider";

export default function ProtectRoute({children}: {children: React.ReactNode }){
  const {  user } = useSelector((state: RootState) => state.auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

    return children;
};

