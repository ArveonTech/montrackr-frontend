import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const errorDashboardPageSlice = createSlice({
  name: "errorDashboardPage",
  initialState,
  reducers: {
    errorDashboardPage: (state, action) => {
      return action.payload;
    },
  },
});

export const { errorDashboardPage } = errorDashboardPageSlice.actions;
export default errorDashboardPageSlice.reducer;
