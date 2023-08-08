import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import { login, forgetPassword } from "../../store/slices/auth/slices";
import { loginValidationSchema } from "../../store/slices/auth/validation";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Toast from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => {
    return {
      role: state.auth?.data?.roleId,
    };
  });
  console.log(role);

  const [error, setError] = useState("");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    try {
      await loginValidationSchema.validate(loginData);

      setError("");
      dispatch(login(loginData));
    } catch (error) {
      const errors = {};

      Toast.error("Check your input fields");
      error.inner.forEach((innerError) => {
        errors[innerError.path] = innerError.message;
      });
      setError(errors);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleResetPassword = () => {
    dispatch(forgetPassword({ email: emailRef.current?.value }));
    setShowModal(false);
  };

  useEffect(() => {
    const element = document.documentElement;
    if (localStorage.theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, []);

  if (role && role === 1) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (role && role !== 1) {
    return <Navigate to="/employee" replace />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-300 dark:bg-slate-800/50">
      <div className="flex h-2/3 w-4/5 overflow-hidden rounded-xl shadow-md sm:w-1/2 lg:w-1/3">
        <div className="flex w-full flex-col items-center justify-center bg-slate-200 px-6 py-8 dark:bg-slate-800">
          <h3 className="mb-4 text-center text-xl font-bold tracking-tight">
            Login
          </h3>

          <form
            className="flex w-full flex-col gap-2 text-sm"
            onSubmit={handleSubmit}
          >
            <Input
              ref={usernameRef}
              required
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={() => setError({ ...error, username: false })}
            />
            {error.username && <span>{error.username}</span>}

            <Input
              ref={passwordRef}
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={() => setError({ ...error, password: false })}
            />
            {error.password && <span>{error.password}</span>}

            <Button
              isButton
              isPrimary
              title="Login"
              className=" mt-4 w-full select-none shadow-md"
              type="submit"
            />

            <Button
              title="Forgot Password"
              className="h-4 cursor-pointer text-sm font-medium text-primary  hover:underline"
              onClick={handleShowModal}
            />
          </form>
        </div>
      </div>

      <Modal
        showModal={showModal}
        closeModal={handleCloseModal}
        title="Forgot Password"
      >
        <div className="">
          <Input
            type="email"
            placeholder="Insert your email"
            id="email"
            name="email"
            autoFocus
          />

          <Button
            isButton
            isPrimary
            isBLock
            className="mt-4"
            title="Reset Password"
            onClick={() => handleResetPassword()}
          />
        </div>
      </Modal>
    </div>
  );
}
