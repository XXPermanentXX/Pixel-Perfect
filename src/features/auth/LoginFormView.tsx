import { useState } from "react";
import { Button, Link, Checkbox, Spinner } from "@nextui-org/react";

import { Status } from "@/models/types";
import { UseFormFieldReturn } from "@/hooks/useFormField";
import { EyeFilledIcon } from "../../ui/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../ui/EyeSlashFilledIcon";
import { RESET_MESSAGES } from "@/models/staticDataModel";
import FormInput from "@/ui/FormInput";

interface AuthViewProps {
  emailField: UseFormFieldReturn;
  passwordField: UseFormFieldReturn;
  authState: Status;
  resetEmailState: Status | "wait";
  isRememberMe: boolean;
  setIsRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: () => void;
  handleForgotPassword: () => void;
}

const LoginForm: React.FC<AuthViewProps> = ({
  emailField,
  passwordField,
  authState,
  resetEmailState,
  isRememberMe,
  setIsRememberMe,
  handleLogin,
  handleForgotPassword,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !emailField.isInvalid) {
      if (!isForgotPassword && !passwordField.isInvalid) {
        handleLogin();
      } else handleForgotPassword();
      e?.preventDefault();
    }
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center">
      {isForgotPassword ? (
        <div className="flex flex-col items-center space-y-5">
          <h3 className="text-center font-semibold">🔒 Reset your password</h3>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-5">
          <h3 className="text-center font-semibold">
            ✨ Welcome to PixelPerfect AI ✨
          </h3>
          <p className="max-w-lg text-center">
            👉 Auto-registration on first login 👈
          </p>
        </div>
      )}

      <div className="pb-10 pt-16 w-[400px]">
        {isForgotPassword ? (
          <>
            <div className="h-[75px]">
              <FormInput
                errorMessage={emailField.error}
                isInvalid={emailField.isInvalid}
                label="Email"
                description={
                  RESET_MESSAGES[resetEmailState] || RESET_MESSAGES.default
                }
                value={emailField.value}
                onChange={emailField.onChange}
                onKeyDown={handleKeyDown}
                classNames={{
                  input: ["text-white"],
                  inputWrapper: [
                    "border-default-400 data-[hover=true]:border-default-500",
                  ],
                  description:
                    resetEmailState === "succeeded"
                      ? "text-green-500"
                      : "text-red-500",
                }}
              ></FormInput>
            </div>
          </>
        ) : (
          <>
            <FormInput
              errorMessage={emailField.error}
              isInvalid={emailField.isInvalid}
              label="Email"
              value={emailField.value}
              onChange={emailField.onChange}
              onKeyDown={handleKeyDown}
            ></FormInput>
            <FormInput
              errorMessage={
                authState === "failed"
                  ? "Incorrect Password"
                  : passwordField.error
              }
              isInvalid={authState === "failed" || passwordField.isInvalid}
              label="Password"
              type={isVisible ? "text" : "password"}
              value={passwordField.value}
              onChange={passwordField.onChange}
              onKeyDown={handleKeyDown}
              endContent={
                passwordField.value !== "" && (
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <EyeFilledIcon className="text-gray-400 text-xl" />
                  ) : (
                    <EyeSlashFilledIcon className="text-gray-400 text-xl" />
                  )}
                </button>)
              }
            ></FormInput>
            <div className="flex justify-end pr-1 -mt-4">
              <Link
                className="text-default-500"
                onClick={() => setIsForgotPassword(true)}
                size="sm"
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex pt-2 px-1 justify-center">
              <Checkbox
                isSelected={isRememberMe}
                onValueChange={(value) => {
                  setIsRememberMe(value);
                }}

                classNames={{
                  wrapper: "before:border-default-500",
                  label: "text-small text-default-500",
                }}
              >
                Remember me
              </Checkbox>
            </div>
          </>
        )}
      </div>

      {isForgotPassword ? (
        <div className="flex justify-center w-full gap-2">
          <Button
            size="lg"
            radius="full"
            variant="solid"
            color="primary"
            className="w-48 bg-white text-primary"
            onPress={() => setIsForgotPassword(false)}
          >
            BACK
          </Button>
          <Button
            size="lg"
            radius="full"
            variant="solid"
            color="primary"
            className="w-48"
            onPress={handleForgotPassword}
            isLoading={resetEmailState === "loading"}
            isDisabled={emailField.isInvalid || emailField.value === ""}
            spinner={<Spinner color="white" size="sm" />}
          >
            RESET
          </Button>
        </div>
      ) : (
        <div className="flex justify-center space-x-10">
          <Button
            size="lg"
            radius="full"
            variant="solid"
            color="primary"
            className="w-48 bg-white text-primary"
            as={Link}
            href="/"
          >
            BACK
          </Button>
          <Button
            size="lg"
            radius="full"
            variant="solid"
            color="primary"
            className="w-48"
            isLoading={authState === "loading"}
            isDisabled={
              emailField.isInvalid ||
              passwordField.isInvalid ||
              emailField.value === "" ||
              passwordField.value === ""
            }
            spinner={<Spinner color="white" size="sm" />}
            onPress={handleLogin}
          >
            LOGIN
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
