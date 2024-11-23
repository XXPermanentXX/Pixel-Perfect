import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import RequestDemo from "./pages/RequestDemo";
import LoginPage from "./pages/Login";
import ProtectRoute from "./features/auth/ProtectRoute";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./provider";
import { onAuthStateChanged,User as FirebaseUser } from "firebase/auth";
import { auth } from "./models/firebaseModel";
import { getUserData } from "./models/user/authSlice";

const GeneratePage = lazy(() => import("./pages/Generate"));


const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser: FirebaseUser | null) => {
        if (currentUser) {
          dispatch(getUserData(currentUser));
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    // Regular expression to check if the path starts with "/generate/model"
    const pattern = /^\/generate\/model(?:\/|$)/;

    // Apply 'overflow: hidden' to fix image upload layout issues in GenerateSettingView
    if (pattern.test(location.pathname)) {
      document.body.style.overflow = "hidden";
    } else {
      // Revert overflow to normal for other pages
      document.body.style.overflow = "auto";
    }
  }, [location]);

  return (
    <NextUIProvider className="min-w-[1024px] antialiased  before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:-z-50 before:bg-dark-bg" navigate={navigate}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route
            path="/generate/*"
            element={
              <Suspense fallback={<div>Loading...</div>}>

                <ProtectRoute>
                  <GeneratePage />
                </ProtectRoute>
              </Suspense>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </NextUIProvider>
  );
};

export default App;
