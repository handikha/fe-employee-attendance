import { createSlice } from "@reduxjs/toolkit";
import { getAttendances, clockIn, clockOut } from "./slices";

const INITIAL_STATE = {
  data: [],
  message: null,
  success: false,
  total_pages: null,
  current_page: null,
  next_page: null,
  isClockLoading: false,
  isGetAttendancesLoading: false,
};

const attendancesSlice = createSlice({
  name: "attendances",
  initialState: INITIAL_STATE,
  reducers: {
    resetSuccessAttendances: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttendances.pending, (state, action) => {
        state.isGetAttendancesLoading = true;
      })
      .addCase(getAttendances.fulfilled, (state, action) => {
        state.isGetAttendancesLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getAttendances.rejected, (state, action) => {
        state.isGetAttendancesLoading = false;
      })

      .addCase(clockIn.pending, (state, action) => {
        state.isClockLoading = true;
      })
      .addCase(clockIn.fulfilled, (state, action) => {
        state.isClockLoading = false;
        state.data = action.payload.data;
      })
      .addCase(clockIn.rejected, (state, action) => {
        state.isClockLoading = false;
      })

      .addCase(clockOut.pending, (state, action) => {
        state.isClockLoading = true;
      })
      .addCase(clockOut.fulfilled, (state, action) => {
        state.isClockLoading = false;
        state.data = action.payload.data;
      })
      .addCase(clockOut.rejected, (state, action) => {
        state.isClockLoading = false;
      });
  },
});

export default attendancesSlice.reducer;
