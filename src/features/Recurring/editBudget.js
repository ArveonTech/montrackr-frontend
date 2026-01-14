import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
};

const editBudgetSlice = createSlice({
  name: "editBudget",
  initialState,
  reducers: {
    editBudget: (state, action) => {
      return action.payload;
    },
  },
});

export const { editBudget } = editBudgetSlice.actions;
export default editBudgetSlice.reducer;
