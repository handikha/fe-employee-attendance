import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getPayrollData = createAsyncThunk(
  "payroll/getPayrollData",
  async (payload, { rejectWithValue }) => {
    try {
      const { startDate, endDate } = payload;
      const PARAMETER = `startDate=${startDate}&endDate=${endDate}`;
      const { data } = await api.get("/payroll?" + encodeURI(PARAMETER));
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);
