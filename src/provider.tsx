import { NextUIProvider } from "@nextui-org/react";
import { configureStore } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import generateReducer from "@/models/generateSlice";
import appReducer from "@/models/AppSlice"
import projectHistoryReducer from "@/models/projectHistorySlice";
import authReducer from "@/models/user/authSlice"

const store = configureStore({
  reducer: {
    app:appReducer,
    generate: generateReducer,
    projectHistory: projectHistoryReducer,
    auth: authReducer
  },
});
export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <ReduxProvider store={store}>
      <NextUIProvider className="min-w-[1024px] antialiased  before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:-z-50 before:bg-dark-bg" navigate={navigate}>{children}</NextUIProvider>
    </ReduxProvider>
  );
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;