import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getAttendances = createAsyncThunk(
  "attendances/getAttendances",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/attendance`);
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const clockIn = createAsyncThunk(
  "attendances/clockIn",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/attendance/clock-in`);
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const clockOut = createAsyncThunk(
  "attendances/clockOut",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/attendance/clock-out`);
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const resetSuccessAttendances = () => ({
  type: "attendances/resetSuccessAttendances",
});
