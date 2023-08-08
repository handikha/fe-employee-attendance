import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (payload, { rejectWithValue }) => {
    try {
      // const {
      //   category_id,
      //   page,
      //   sort_name,
      //   sort_price,
      //   limit,
      //   keywords,
      //   status,
      // } = payload;
      // const PARAMETER = `page=${page}&limit=${limit}&category_id=${category_id}&sort_name=${sort_name}&sort_price=${sort_price}&status=${status}&keywords=${keywords}`;
      // const { data } = await api.get("/products?" + encodeURI(PARAMETER));
      const { data } = await api.get("/employees");

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/employees", payload);
      return data.message;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/employees/${encodeURI(id)}`, formData);
      return data.message;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete("/employees/" + encodeURI(payload));
      // Toast.success("Category deleted successfully");
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetSuccessUser = () => ({
  type: "users/resetSuccessUser",
});
