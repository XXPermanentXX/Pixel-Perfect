import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./LoginFormView";

import { useFormField } from "@/hooks/useFormField";
import { AppDispatch, RootState } from "@/provider";
import { initializeAuthFromCookie, logout, sendPasswordReset, signIn, updateUserData, validateLogin } from "@/models/user/authSlice";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export type LoginModeType = "emailPwd" | "emailCode";


const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const authState = useSelector((state: RootState) => state.auth.authState);
  const adminKey = useSelector((state:RootState) => state.auth.adminKey)
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(["admin_key"]);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const resetEmailState = useSelector(
    (state: RootState) => state.auth.resetEmailState
  );
  const emailField = useFormField({
    initialValue: "",
    validator: (value) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
        return "Please enter a valid email address";

      return null;
    },
  });

  const passwordField = useFormField({
    initialValue: "",
    validator: (value) => {
      if (value.length < 6) return "Must be at least 6 characters long";

      return null;
    },
  });
  useLayoutEffect(() => {
    const login = async () => {
      if (authState === "succeeded") {
        // Set a cookie when logged in
        await dispatch(validateLogin({username:"admin",password:"admin@123"}));
        setCookie("admin_key", adminKey, { path: "/", sameSite: "strict", secure: true, maxAge: 3600 });
        navigate("/generate/model");
      }
    };
    login();
  }, [authState, dispatch]
);

  useEffect(() => {
    const storedAdminKey = cookies.admin_key;
    if (storedAdminKey) {
      // You can now use the storedAdminKey for any logic you need
      console.log("Stored Admin Key:", storedAdminKey);
      dispatch(initializeAuthFromCookie(storedAdminKey));
    }
  }, [dispatch, cookies]);
  const handleLogin = () => {
    dispatch(
      signIn({
        email: emailField.value,
        password: passwordField.value,
        isRememberMe,
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleForgotPassword = () => {
    dispatch(sendPasswordReset(emailField.value));
  };
  return (
    <>
      <LoginForm
        isRememberMe={isRememberMe}
        authState={authState}
        resetEmailState={resetEmailState}
        emailField={emailField}
        passwordField={passwordField}
        setIsRememberMe={setIsRememberMe}
        handleLogin={handleLogin}
        handleForgotPassword={handleForgotPassword}
      />
    </>
  );
};

export default Login;
