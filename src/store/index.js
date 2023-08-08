import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import rolesReducer from "./slices/roles";
import usersReducer from "./slices/users";

const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
    users: usersReducer,
  },
});

export default store;
