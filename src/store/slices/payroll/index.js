import { createSlice } from "@reduxjs/toolkit";
import { getPayrollData } from "./slices";

const INITIAL_STATE = {
  data: [],
  message: null,
  success: false,
  total_pages: null,
  current_page: null,
  next_page: null,
  isGetPayrollLoading: false,
};

const attendancesSlice = createSlice({
  name: "payroll",
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder
      .addCase(getPayrollData.pending, (state, action) => {
        state.isGetPayrollLoading = true;
      })
      .addCase(getPayrollData.fulfilled, (state, action) => {
        state.isGetPayrollLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getPayrollData.rejected, (state, action) => {
        state.isGetPayrollLoading = false;
      });
  },
});

export default attendancesSlice.reducer;
