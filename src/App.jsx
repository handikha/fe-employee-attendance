import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Employee from "./pages/Employee";
import Admin from "./pages/Admin";
import AdminAccountSetting from "./pages/Admin/account.setting";
import EmployeeAccountSetting from "./pages/Employee/account.setting";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ChangeDefaultPassword from "./pages/Verification";
import { Toaster } from "react-hot-toast";
import { keepLogin } from "./store/slices/auth/slices";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./protected.routes";
import Payroll from "./pages/Employee/payroll";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return {
      user: state.auth?.data,
    };
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(keepLogin()).finally(() => {
      setLoading(false);
    });
  }, []);

  const token = localStorage.getItem("token");

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="mx-auto block h-10 w-10 animate-spin rounded-full border-4 border-primary border-r-transparent">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {token && <Navbar user={user} />}

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/auth/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/auth/verify/:token"
          element={<ChangeDefaultPassword />}
        />

        {user?.roleId === 1 && (
          <>
            <Route path="/admin" element={<Admin user={user} />} />
            <Route path="/admin/:context" element={<Admin user={user} />} />
            <Route
              path="/admin/account-setting/:context"
              element={<AdminAccountSetting user={user} />}
            />
          </>
        )}

        {user?.roleId !== 1 && (
          <>
            <Route path="/employee" element={<Employee user={user} />} />
            <Route
              path="/employee/payroll-report"
              element={<Payroll user={user} />}
            />
            <Route
              path="/employee/account-setting/:context"
              element={<EmployeeAccountSetting user={user} />}
            />
          </>
        )}

        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
