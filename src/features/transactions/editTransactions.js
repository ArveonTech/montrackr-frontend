import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
};

const editTransactionsSlice = createSlice({
  name: "editTransactions",
  initialState,
  reducers: {
    editTransactions: (state, action) => {
      return action.payload;
    },
  },
});

export const { editTransactions } = editTransactionsSlice.actions;
export default editTransactionsSlice.reducer;
