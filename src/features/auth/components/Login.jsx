import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsync,
  resetError,
  selectError,
  selectLoggedInUser,
  selectPasswordReset,
  togglePasswordReset,
} from "../authSlice";
import skytrade from "../../../images/skytrade.png";
import { toast, Bounce } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const loginError = useSelector(selectError);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const passwordReset = useSelector(selectPasswordReset);
  useEffect(() => {
    if (passwordReset) {
      toast.success("Password has been reset", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          dispatch(togglePasswordReset());
        },
      });
    }
  }, [passwordReset]);

  const handleInputChange = (e) => {
    if (loginError) dispatch(resetError());
  };

  return (
    <>
      {user && <Navigate to="/" replace="true"></Navigate>}

      {!passwordReset && (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Skytrade"
              src={skytrade}
              className="mx-auto h-16 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              className="space-y-6"
              onSubmit={handleSubmit((data) => {
                dispatch(loginAsync(data));
              })}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onKeyDown={handleInputChange}
                    id="email"
                    {...register("email", {
                      required: "Email is Required",
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: "Email is Invalid",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onKeyDown={handleInputChange}
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}

                  {loginError &&
                    !errors.password &&
                    (loginError === "Unauthorized" ? (
                      <p className="text-red-600">{loginError}</p>
                    ) : (
                      <p className="text-red-600">Please retry</p>
                    ))}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
