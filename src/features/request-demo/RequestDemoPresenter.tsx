import { useDispatch } from "react-redux";
import RequestDemoFormView from "./RequestDemoFormView";
import { useSelect } from "@nextui-org/react";

const RequestDemoPresenter = () => {
  const dispatch = useDispatch();
  // State to track if the demo request form has been successfully submitted.
  const isSumbitted = useSelect((state) => state.requestDemo.isSumbitted);

  return (
    <RequestDemoFormView
      formState={formState}
      fieldValidity={fieldValidity}
      onInputChange={handleInputChange}
      submitRequest={handleFormSubmit}
      isLoading={isLoading}
    />
  );
};

export default RequestDemoPresenter;
