import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
};

const changeProfileSlice = createSlice({
  name: "changeProfile",
  initialState,
  reducers: {
    changeProfile: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeProfile } = changeProfileSlice.actions;
export default changeProfileSlice.reducer;
