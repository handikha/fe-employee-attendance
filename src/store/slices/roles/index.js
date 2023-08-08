import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  getRoles,
  updateCategory,
} from "./slices";

const INITIAL_STATE = {
  data: [],
  message: null,
  success: false,
  total_pages: null,
  current_page: null,
  next_page: null,
  isGetRolesLoading: false,
};

const categoriesSlice = createSlice({
  name: "roles",
  initialState: INITIAL_STATE,
  reducers: {
    resetSuccessRole: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state, action) => {
        state.isGetRolesLoading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.isGetRolesLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.isGetRolesLoading = false;
      });

    // .addCase(createCategory.pending, (state, action) => {
    //   state.isSubmitCategoryLoading = true;
    // })
    // .addCase(createCategory.fulfilled, (state, action) => {
    //   state.isSubmitCategoryLoading = false;
    //   state.message = action.payload.message;
    //   state.success = true;
    // })
    // .addCase(createCategory.rejected, (state, action) => {
    //   state.isSubmitCategoryLoading = false;
    //   state.message = action.payload;
    // })

    // .addCase(updateCategory.pending, (state, action) => {
    //   state.isSubmitCategoryLoading = true;
    // })
    // .addCase(updateCategory.fulfilled, (state, action) => {
    //   state.isSubmitCategoryLoading = false;
    //   state.message = action.payload.message;
    //   state.success = true;
    // })
    // .addCase(updateCategory.rejected, (state, action) => {
    //   state.isSubmitCategoryLoading = false;
    //   state.message = action.payload;
    // })

    // .addCase(deleteCategory.pending, (state, action) => {
    //   state.isDeleteCategoryLoading = true;
    // })
    // .addCase(deleteCategory.fulfilled, (state, action) => {
    //   state.isDeleteCategoryLoading = false;
    //   state.success = true;
    // })
    // .addCase(deleteCategory.rejected, (state, action) => {
    //   state.isDeleteCategoryLoading = false;
    // });
  },
});

export default categoriesSlice.reducer;
