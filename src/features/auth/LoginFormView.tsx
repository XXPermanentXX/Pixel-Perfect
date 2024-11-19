import { useState } from "react";
import { Button, Input, Link, Checkbox } from "@nextui-org/react";

import { Status } from "@/models/types";
import { UseFormFieldReturn } from "@/hooks/useFormField";
import { EyeFilledIcon } from "../../ui/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../ui/EyeSlashFilledIcon";
import { RESET_MESSAGES } from "@/models/staticDataModel";

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
    <div>
      <header>
        {isForgotPassword ? (
          "🔒 Reset your password"
        ) : (
          <div className="flex flex-col">
            ✨ Welcome to PixelPerfect AI ✨
            <div className="pl-1 text-sm text-gray-500 font-light">
              👉 Auto-registration on first login 👈
            </div>
          </div>
        )}
      </header>

      <main>
        {isForgotPassword ? (
          <>
            <div className="h-[75px]">
              <Input
                isRequired
                errorMessage={emailField.error}
                isInvalid={emailField.isInvalid}
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                description={
                  RESET_MESSAGES[resetEmailState] || RESET_MESSAGES.default
                }
                value={emailField.value}
                variant="bordered"
                onChange={emailField.onChange}
                onKeyDown={handleKeyDown}
                classNames={{
                  description:
                    resetEmailState === "succeeded"
                      ? "text-green-500"
                      : "text-red-500",
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="h-[75px]">
              <Input
                isRequired
                errorMessage={emailField.error}
                isInvalid={emailField.isInvalid}
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                value={emailField.value}
                variant="bordered"
                onChange={emailField.onChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="h-[75px]">
              <Input
                isRequired
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <EyeFilledIcon className="text-gray-400" />
                    ) : (
                      <EyeSlashFilledIcon className="text-gray-400" />
                    )}
                  </button>
                }
                errorMessage={
                  authState === "failed"
                    ? "Incorrect Password"
                    : passwordField.error
                }
                isInvalid={authState === "failed" || passwordField.isInvalid}
                label="Password"
                labelPlacement="outside"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                value={passwordField.value}
                variant="bordered"
                onChange={passwordField.onChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex justify-end pr-1 -mt-4">
              <Link
                className="text-cyan-500"
                onClick={() => setIsForgotPassword(true)}
                size="sm"
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex px-1 justify-center">
              <Checkbox
                isSelected={isRememberMe}
                onValueChange={(value) => {
                  setIsRememberMe(value);
                }}
                classNames={{
                  label: "text-small",
                }}
              >
                Remember me
              </Checkbox>
            </div>
          </>
        )}
      </main>

      <footer>
        {isForgotPassword ? (
          <div className="flex justify-center w-full gap-2">
            <Button
              color="default"
              variant="flat"
              onPress={() => setIsForgotPassword(false)}
            >
              Back
            </Button>
            <Button
              color="primary"
              onPress={handleForgotPassword}
              isLoading={resetEmailState === "loading"}
              isDisabled={emailField.isInvalid || emailField.value === ""}
            >
              Reset
            </Button>
          </div>
        ) : (
          <div className="flex justify-center w-full gap-2">
            <Button color="default" variant="flat" as={Link} href="/">
              Back
            </Button>
            <Button
              color="primary"
              isLoading={authState === "loading"}
              isDisabled={
                emailField.isInvalid ||
                passwordField.isInvalid ||
                emailField.value === "" ||
                passwordField.value === ""
              }
              onPress={handleLogin}
            >
              Log in
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default LoginForm;