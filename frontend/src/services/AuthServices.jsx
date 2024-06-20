import axios from "axios";

export const userSignUp = (payload) => {
  try {
    const response = axios.post(
      "http://localhost:3105/api/passengers",
      payload
    );
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error(error.message);
    }
  }
};

export const userSignIn = (payload) => {
  try {
    const response = axios.post(
      "http://localhost:3105/api/passengers/signin",
      payload
    );
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error(error.message);
    }
  }
};

export const verifyUserOtp = async (payload) => {
    try {
        const response = axios.post(
          "http://localhost:3105/api/passengers/verifyotp",
          payload
        );
        return response;
      } catch (error) {
        if (error.response) {
          throw error.response;
        } else {
          throw new Error(error.message);
        }
      }
}