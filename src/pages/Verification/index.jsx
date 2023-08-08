import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { verifyAccount } from "../../store/slices/auth/slices";
import { changePasswordValidationSchema } from "../../store/slices/auth/validation";
import { useDispatch } from "react-redux";
import Toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [error, setError] = useState("");

  console.log(error);

  const currentPasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const confrimPasswordRef = useRef(null);

  const [token, setToken] = useState();

  useEffect(() => {
    setToken(location.pathname.split("/")[3]);
  }, [location.pathname]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const verificationData = {
      currentPassword: currentPasswordRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confrimPasswordRef.current?.value,
    };

    try {
      await changePasswordValidationSchema.validate(verificationData, {
        abortEarly: false,
      });

      setError("");
      dispatch(verifyAccount({ token, verificationData }));

      navigate("/");
    } catch (error) {
      const errors = {};

      Toast.error("Check your input fields");
      error.inner.forEach((innerError) => {
        errors[innerError.path] = innerError.message;
      });
      setError(errors);
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-300/60">
      <div className="flex h-2/3 w-4/5 overflow-hidden rounded-xl shadow-md sm:w-1/2 lg:w-1/3">
        <div className="flex w-full flex-col items-center justify-center bg-slate-200 px-6 py-8 dark:bg-slate-800">
          <h3 className="text-dark mb-4 text-center text-xl font-bold tracking-tight">
            Verification
          </h3>

          <form
            className="flex w-full flex-col gap-2 text-sm"
            onSubmit={handleSubmit}
          >
            <Input
              ref={currentPasswordRef}
              required
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder="Current password"
              onChange={() => setError({ ...error, currentPassword: false })}
            />
            {error.currentpassword && (
              <div className=" text-red-500 dark:text-red-400">
                {error.currentpassword}
              </div>
            )}

            <Input
              ref={passwordRef}
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={() => setError({ ...error, password: false })}
            />
            {error.password && (
              <div className=" text-red-500 dark:text-red-400">
                {error.password}
              </div>
            )}

            <Input
              ref={confrimPasswordRef}
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={() => setError({ ...error, confirmPassword: false })}
            />
            {error.confirmPassword && (
              <div className=" text-red-500 dark:text-red-400">
                {error.confirmPassword}
              </div>
            )}

            <Button
              isButton
              isPrimary
              title="Verify"
              className=" mt-4 w-full select-none shadow-md"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
