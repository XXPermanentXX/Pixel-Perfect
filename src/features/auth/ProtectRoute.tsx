import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState} from "@/provider";
import { useEffect, useState } from "react";
import { firebaseConfig } from "@/models/apiConfig";

export default function ProtectRoute({children}: {children: React.ReactNode }){
  const { user } = useSelector((state: RootState) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  useEffect(() => {
    const userInfo = localStorage.getItem('firebase:authUser:'+firebaseConfig.apiKey+':[DEFAULT]')
    setIsAuthenticated(!!userInfo)
  }, [user?.userId]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

    return children;
};

