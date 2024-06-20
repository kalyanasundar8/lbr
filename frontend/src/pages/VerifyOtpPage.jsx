import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { verifyUserOtp } from "../services/AuthServices";
import { ErrorMessage } from "../services/ErrorMessage";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const token = location.state;

  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const verifyPassengerOtp = async (data) => {
    const payload = {
      otp: data.otp,
      token: token,
    };

    const response = await verifyUserOtp(payload);
    console.log(response);
  };

  return (
    <div>
      <section className="flex flex-col items-center mt-[150px]">
        <h1 className="text-2xl font-primaryFont font-bold mb-3">Verify Otp</h1>
        <form
          onSubmit={handleSubmit(verifyPassengerOtp)}
          className="flex items-center flex-col"
        >
          <input
            type="text"
            className="border-2 border-gray-300 rounded-[5px] w-[320px] px-[10px] py-[5px] my-1 placeholder:text-[15px]"
            placeholder="OTP"
            {...register("otp", { required: "OTP is required" })}
          />
          <button className="text-sm font-primaryFont font-semibold bg-green-500 w-[320px] py-[10px] rounded-[5px] mb-3">
            Verify
          </button>
        </form>
      </section>
      {errorMessage ? <ErrorMessage error={errorMessage} /> : ""}
    </div>
  );
};

export default VerifyOtpPage;
