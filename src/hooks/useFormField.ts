import { resetAuthState } from "@/models/user/authSlice";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

type Validator = (value: string) => string | null;

// Define the return type of useFormField
export interface UseFormFieldReturn {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  error: string | null;
  isInvalid: boolean;
}

// Define the parameters type for useFormField
export interface UseFormFieldProps {
  initialValue: string;
  validator?: Validator;
}

export const useFormField: (props: UseFormFieldProps) => UseFormFieldReturn = (
  props,
) => {
  const [value, setValue] = useState(props.initialValue);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      dispatch(resetAuthState());

      // Execute validation logic only when there is input
      if (newValue && props.validator) {
        const errorMessage = props.validator(newValue);
        setError(errorMessage);
      } else {
        setError(null); // Do not show error message if there is no input
      }
    },
    [props.validator],
  );

  const onClear = useCallback(() => {
    setValue("");
    setError(null);
  }, []);

  return {
    value,
    onChange,
    onClear,
    error,
    isInvalid: !!error, // Mark as invalid if input is not empty and there is an error
  };
};