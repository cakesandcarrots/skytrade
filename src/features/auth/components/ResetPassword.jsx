import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordAsync,
  selectLoggedInUser,
  selectPasswordReset,
} from "../authSlice";
import skytrade from "../../../images/skytrade.png";

function ResetPassword() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const passwordReset = useSelector(selectPasswordReset);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');
  const token = params.get('token');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
    {passwordReset==true && <Navigate to="/login" replace="true"></Navigate>}
      {user && <Navigate to="/" replace="true"></Navigate>}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Skytrade" src={skytrade} className="mx-auto h-16 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter a new Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(resetPasswordAsync({email,token,password: data.password}));
            })}
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 New Password
                </label>
                <div className="text-sm"></div>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
                <p></p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm New Password
                </label>
              </div>

              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Password confirmation is required",
                    validate: (value, formValues) => {
                      if (value !== formValues.password)
                        return "Doesn't match with password";
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continue
              </button>
            </div>
          </form>

          
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
