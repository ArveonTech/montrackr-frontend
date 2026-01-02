import { configureStore } from "@reduxjs/toolkit";

import dummyReducer from "@/features/landing/dummy";

export const store = configureStore({
  reducer: dummyReducer,
});
