import { useEffect, useMemo, useState } from "react";
import RequestDemoFormView from "./RequestDemoFormView";
import RequestDemoConfirmedView from "./RequestDemoConfirmedView";
import { useDispatch, useSelector } from "react-redux";
import { initializeRequest, putDemoRequest } from "../../models/requestDemoSlice";
import { AppDispatch, RootState } from "@/provider";

const RequestDemoPresenter = () => {
  const dispatch = useDispatch<AppDispatch>();
  // State to track if the demo request form has been successfully submitted.
  const isSubmitted = useSelector((state:RootState) => state.requestDemo.isSubmitted);
  // State to indicate if the request is currently being processed.
  const isLoading = useSelector((state:RootState) => state.requestDemo.isLoading);
  // Form state to capture and manage input values.
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companySize: "",
    industry: "",
    requestContent: "",
  });

  // State to track the validity of form fields. Initially, all fields are considered valid.
  const [fieldValidity, setFieldValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
    companySize: true,
    industry: true,
    requestContent: true,
  });

  useEffect(() => {
    dispatch(initializeRequest(formState));
  }, [dispatch]);

  // Validates non-empty fields.
  const validateField = (value: string) => {
    if (value === undefined) return false;
    return value.trim() !== "";
  };

  // Validates email using a simple regex pattern.
  const validateEmail = (email: string) => {
    if (!email) return false;
    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) !== null;
  };

  // Email validation side-effect.
  useMemo(() => {
    if (formState.email === "") return false;
    const isValidEmail = validateEmail(formState.email);
    setFieldValidity((prevFieldValidity) => ({
      ...prevFieldValidity,
      email: isValidEmail,
    }));
  }, [formState.email]);

  // Handles input changes and updates form and validity states.
  const handleInputChange = (fieldName:string) => (value:string) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    if (validateField(value)) {
      setFieldValidity((prevValidity) => ({
        ...prevValidity,
        [fieldName]: true,
      }));
    }
  };

  // Submits the form after validating all fields. If valid, sends the request and fetches the response.
  const handleFormSubmit = async () => {
    console.log("Submitting form.....");
    const updatedFieldValidity = {
      firstName: validateField(formState.firstName),
      lastName: validateField(formState.lastName),
      email: validateEmail(formState.email),
      companySize: validateField(formState.companySize),
      industry: validateField(formState.industry),
      requestContent: validateField(formState.requestContent),
    };
    setFieldValidity(updatedFieldValidity);

    // Check if all fields in the form are valid.
    const isFormValid = Object.values(updatedFieldValidity).every((value) => value);
    if (isFormValid) {
      console.log(formState);
      dispatch(putDemoRequest(formState));
    }
  };

  // Conditional rendering based on the submission status.
  return <div>
    {
    isSubmitted 
    ?<RequestDemoConfirmedView /> 
    : <RequestDemoFormView 
          formState={formState}
          fieldValidity={fieldValidity}
          onInputChange={handleInputChange}
          submitRequest={handleFormSubmit}
          isLoading={isLoading} 
          label={""} 
          errorMessage={null} />
    }
    </div>;
};

export default RequestDemoPresenter;
