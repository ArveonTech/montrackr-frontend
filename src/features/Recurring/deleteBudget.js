import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
};

const deleteBudgetSlice = createSlice({
  name: "deleteBudget",
  initialState,
  reducers: {
    deleteBudget: (state, action) => {
      return action.payload;
    },
  },
});

export const { deleteBudget } = deleteBudgetSlice.actions;
export default deleteBudgetSlice.reducer;
