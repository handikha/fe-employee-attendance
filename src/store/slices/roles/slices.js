import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getRoles = createAsyncThunk(
  "roles/getRoles",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/roles");
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const resetSuccessRole = () => ({
  type: "roles/resetSuccessRole",
});
