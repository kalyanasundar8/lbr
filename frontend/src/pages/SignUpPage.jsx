import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/AuthActions";
import { Link, useNavigate } from "react-router-dom";

// Services
import { userSignUp } from "../services/AuthServices";
import { ErrorMessage } from "../services/ErrorMessage";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUpPassenger = async (data) => {
    try {
      const response = await userSignUp(data);
      console.log(response.response);
      if (response?.status === 201) {
        const token = response?.data?.token;
        const userData = response?.data;

        dispatch(setUser(response?.data));
        navigate("/verifyotp", { state: token });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error?.response?.data?.mssg);
      if (error.response.status === 400) {
        setErrorMessage(error?.response?.data?.mssg);
      }
    }
  };

  return (
    <div>
      <section className="flex flex-col items-center mt-[150px]">
        <h1 className="text-2xl font-primaryFont font-bold mb-3">Sign Up</h1>
        <form
          onSubmit={handleSubmit(signUpPassenger)}
          className="flex items-center flex-col"
        >
          <div className="flex flex-col">
            <input
              type="text"
              name="passengerName"
              className={`${
                errors.passengerName
                  ? "border-2 border-red-500 rounded-[5px] w-[320px] px-[10px] py-[5px] my-2 placeholder:text-[15px]"
                  : "border-2 border-gray-300 rounded-[5px] w-[320px] px-[10px] py-[5px] placeholder:text-[15px]"
              }`}
              placeholder="UserName"
              {...register("passengerName", {
                required: "Username is required",
              })}
            />
            {errors.passengerName && (
              <p className="text-[12px] font-medium text-red-500">
                {errors.passengerName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col my-2">
            <input
              type="text"
              name="mobileNumber"
              className={`${
                errors.mobileNumber
                  ? "border-2 border-red-500 rounded-[5px] w-[320px] px-[10px] py-[5px] my-2 placeholder:text-[15px]"
                  : "border-2 border-gray-300 rounded-[5px] w-[320px] px-[10px] py-[5px] placeholder:text-[15px]"
              }`}
              placeholder="MobileNumber"
              {...register("mobileNumber", {
                required: "Mobilenumber is required",
              })}
            />
            {errors.mobileNumber && (
              <p className="text-[12px] font-medium text-red-500">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>
          <button className="text-sm font-primaryFont font-semibold bg-green-500 w-[320px] py-[10px] rounded-[5px] mb-3">
            Continue
          </button>
          <p className="text-sm">
            I already have an account?{" "}
            <Link to="/signin" className="text-green-500 font-medium">Sign In</Link>
          </p>
        </form>
      </section>
      {errorMessage ? <ErrorMessage error={errorMessage} /> : " "}
    </div>
  );
};

export default SignUpPage;
