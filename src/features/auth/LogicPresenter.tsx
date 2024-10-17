import React, { useEffect, useState } from "react";
import LoginFormView from "./LoginFormView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { initialStateFromCookie, clearError, validateLogin } from "@/models/authSlice";
import { AppDispatch } from "@/provider";

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["admin_key"]);

  // State to track if the demo request form has been successfully submitted.
  const { isLoading, error, isLoggedIn, adminKey } = useSelector(
    (state:any) => state.auth
  );

  // Form state to capture and manage input values.
  const [formState, SetFormState] = useState({
    username: "",
    password: "",
  });

  // State to track the validity of form fields. Initially, all fields are considered valid.
  const [fieldValidity, setFieldValidity] = useState({
    username: true,
    password: true,
  });

  // Log in and jump to generate page
  useEffect(() => {
    if (isLoading && adminKey) {
      // Set a cookie when existing admin key in cookies
      setCookie("admin_key", adminKey, {
        path: "/",
        sameSite: "strict",
        secure: true,
        maxAge: 3600,
      });
      navigate("/generate/model");
    }
  }, [isLoggedIn, adminKey, navigate, setCookie]);

  // Check if there is an existing admin key in cookies
  useEffect(() => {
    const storedAdminKey = cookies.admin_key;
    if (storedAdminKey) {
      // You can now use the storedAdminKey for any logic you need
      console.log("Stored Admin Key:", storedAdminKey);
      dispatch(initialStateFromCookie(storedAdminKey));
    }
  }, [dispatch, cookies]);

  // Validates non-empty fields.
  const validateField = (value: any)=> {
    if (value === undefined) return false;
    return value.trim() !== "";
  };

  // Handles input changes and updates form and validity states.
  const handleInputChange = (fieldName: string) => (value: string) => {
    SetFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    if (error) {
      dispatch(clearError());
    }
    if (validateField(value)) {
      setFieldValidity((preValidity) => ({
        ...preValidity,
        [fieldName]: true,
      }));
    }
  };

  // Submits the form after validating all fields. If valid, sends the request and fetches the response.
  const handleFormSubmit = async () => {
    const updatedFieldValidity = {
      username: validateField(formState.username),
      password: validateField(formState.password),
    };
    setFieldValidity(updatedFieldValidity);

    // Check if all fields in the form are valid.
    const isFormValid = Object.values(updatedFieldValidity).every((value) => value);
    // use Appdispatch
    const appdispatch = useDispatch<AppDispatch>();
    if (isFormValid) {
      appdispatch(validateLogin(formState));
    }
  };


  return (
    <LoginFormView formState={formState} fieldValidity={fieldValidity} onInputChange={handleInputChange} submitLogin={handleFormSubmit} isLoading={isLoading} errorMessage={error}/>
  );
};

export default LoginComponent;
