import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import {
  login,
  keepLogin,
  logout,
  forgetPassword,
  verifyAccount,
  resetPassword,
  changePassword,
  changeProfileImage,
} from "./slices";

// @initial state
const INITIAL_STATE = {
  data: [],
  //@loading state
  isLoginLoading: false,
  isKeepLoginLoading: false,
  isLogoutLoading: false,
  isForgetLoading: false,
  isVerifyAccoutLoading: false,
  isResetPasswordLoading: false,
  isChangePasswordLoading: false,
  isChangeProfileImageLoading: false,

  //@keep login state
  isKeepLogin: false,
  isLogin: false,

  //@logoutstate
  isLogout: true,
};

//@Auth slieces
// @create slice
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: {
    //@Login Slices
    [login.pending]: (state, action) => {
      state.isLoginLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoginLoading = false;
    },

    //@Keep login
    [keepLogin.pending]: (state, action) => {
      state.isKeepLoginLoading = true;
    },
    [keepLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isKeepLogin = true;
      state.isKeepLoginLoading = false;
    },
    [keepLogin.rejected]: (state, action) => {
      state.isKeepLogin = false;
      state.isKeepLoginLoading = false;
    },

    //@Verify Account
    [verifyAccount.pending]: (state, action) => {
      state.isVerifyAccoutLoading = true;
    },
    [verifyAccount.fulfilled]: (state, action) => {
      state.isVerifyAccoutLoading = false;
    },
    [verifyAccount.rejected]: (state, action) => {
      state.isVerifyAccoutLoading = false;
    },

    //@Logout
    [logout.pending]: (state, action) => {
      state.isLogoutLoading = true;
      state = Object.assign(state, INITIAL_STATE);
    },
    [logout.fulfilled]: (state, action) => {
      state = Object.assign(state, INITIAL_STATE);
    },
    [logout.rejected]: (state, action) => {
      state.isLogoutLoading = false;
    },

    //@Forget Password
    [forgetPassword.pending]: (state, action) => {
      state.isForgetLoading = true;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.isForgetLoading = false;
    },
    [forgetPassword.rejected]: (state, action) => {
      state.isForgetLoading = false;
    },

    //@Reset Password
    [resetPassword.pending]: (state, action) => {
      state.isResetPasswordLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isResetPasswordLoading = false;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isResetPasswordLoading = false;
    },

    //@Reset Password
    [changePassword.pending]: (state, action) => {
      state.isChangePasswordLoading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.isChangePasswordLoading = false;
    },
    [changePassword.rejected]: (state, action) => {
      state.isChangePasswordLoading = false;
    },

    //@Change profile image
    [changeProfileImage.pending]: (state, action) => {
      state.isChangeProfileImageLoading = true;
    },
    [changeProfileImage.fulfilled]: (state, action) => {
      state.isChangeProfileImageLoading = false;
      state.profileImg = action.payload?.imageUrl;
    },
    [changeProfileImage.rejected]: (state, action) => {
      state.isChangeProfileImageLoading = false;
    },
  },
});

export default authSlice.reducer;
