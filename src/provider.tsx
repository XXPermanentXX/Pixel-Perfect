import { NextUIProvider } from "@nextui-org/react";
import { configureStore } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const store = configureStore({
    reducer: {},
  });

  return (
    <ReduxProvider store={store}>
      <NextUIProvider navigate={navigate}>{children}</NextUIProvider>
    </ReduxProvider>
  );
}
