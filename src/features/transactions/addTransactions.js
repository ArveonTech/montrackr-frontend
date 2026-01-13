import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
};

const addTransactionsSlice = createSlice({
  name: "addTransactions",
  initialState,
  reducers: {
    addTransactions: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTransactions } = addTransactionsSlice.actions;
export default addTransactionsSlice.reducer;
