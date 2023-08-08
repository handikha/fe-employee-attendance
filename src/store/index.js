import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import rolesReducer from "./slices/roles";
import usersReducer from "./slices/users";
import attendancesReducer from "./slices/attendances";
import payrollReducer from "./slices/payroll";

const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
    users: usersReducer,
    attendances: attendancesReducer,
    payroll: payrollReducer,
  },
});

export default store;
