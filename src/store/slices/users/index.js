import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, getUsers, updateUser } from "./slices";

const INITIAL_STATE = {
  data: [],
  message: null,
  success: false,
  total_pages: null,
  current_page: null,
  next_page: null,
  isGetUsersLoading: false,
  isSubmitUserLoading: false,
  isDeleteUserLoading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    resetSuccessUser: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isGetUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isGetUsersLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isGetUsersLoading = false;
      })

      .addCase(createUser.pending, (state, action) => {
        state.isSubmitUserLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isSubmitUserLoading = false;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isSubmitUserLoading = false;
      })

      .addCase(updateUser.pending, (state, action) => {
        state.isSubmitUserLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isSubmitUserLoading = false;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isSubmitUserLoading = false;
      })

      .addCase(deleteUser.pending, (state, action) => {
        state.isDeleteUserLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeleteUserLoading = false;
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeleteUserLoading = false;
      });
  },
});

export default usersSlice.reducer;
