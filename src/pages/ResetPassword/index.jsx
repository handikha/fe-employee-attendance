import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { verifyAccount, resetPassword } from "../../store/slices/auth/slices";
import { resetPasswordSchema } from "../../store/slices/auth/validation";
import { useDispatch } from "react-redux";
import Toast from "react-hot-toast"

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { token } = useParams()

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await resetPasswordSchema.validate(values,{
          abortEarly: false,
        });
      dispatch(resetPassword({token, values}));

      navigate("/");
    } catch (error) {
      const errors = {};

      Toast.error("Check your input fields");
      error.inner.forEach((innerError) => {
        errors[innerError.path] = innerError.message;
      });

      setErrors(errors);
    }
  };


  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-300/60'>
      <div className='flex h-1/3 w-2/5 overflow-hidden rounded-xl shadow-md sm:w-1/2 lg:w-1/3'>
        <div className='flex w-full flex-col items-center justify-center bg-slate-200 px-6 py-8'>
          <h3 className='text-dark mb-4 text-center text-xl font-bold tracking-tight'>
            Reset Password
          </h3>

          <form
            className='flex w-full flex-col gap-2 text-sm'
            onSubmit={handleSubmit}
          >
            <Input
              required
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
            />
            {errors?.password && <span className=" text-red-500 dark:text-red-400">{errors?.password}</span>}

            <Input
              required
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirm password'
              onChange={handleChange}
            />
            {errors?.confirmPassword && <span className=" text-red-500 dark:text-red-400">{errors?.confirmPassword}</span>}

            <Button
              isButton
              isPrimary
              title='Reset Password'
              className=' mt-4 w-full select-none shadow-md'
              type='submit'
            />
          </form>
        </div>
      </div>
    </div>
  );
}
