import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
};

const addBudgetSlice = createSlice({
  name: "addBudget",
  initialState,
  reducers: {
    addBudget: (state, action) => {
      return action.payload;
    },
  },
});

export const { addBudget } = addBudgetSlice.actions;
export default addBudgetSlice.reducer;
