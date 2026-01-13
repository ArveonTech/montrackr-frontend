import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const errorTransactionsPageSlice = createSlice({
  name: "errorTransactionsPage",
  initialState,
  reducers: {
    errorTransactionsPage: (state, action) => {
      return action.payload;
    },
  },
});

export const { errorTransactionsPage } = errorTransactionsPageSlice.actions;
export default errorTransactionsPageSlice.reducer;
