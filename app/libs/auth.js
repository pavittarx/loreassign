import axios from "axios";

require("dotenv").config();

export const login = async (username, password) => {
  const url = process.env.APP_REQUEST_ENDPOINT + "/api/login";

  try {
    const response = await axios.post(url, {
      username,
      password,
    });

    console.log(response);

    return response.data;
  } catch (error) {
    const { response } = error;
    return response.data;
  }
};

export const register = async (username, email, password) => {
  const url = process.env.APP_REQUEST_ENDPOINT + "/api/signup";

  try {
    const response = await axios.post(url, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const { response } = error;
    return response.data;
  }
};

export const authenticate = async () => {
  const url = process.env.APP_REQUEST_ENDPOINT + "/api/auth";

  try {
    const result = await axios.get(url);
    console.log("==", response);
    if (response.success) return true;
  } catch (error) {
    const { response } = error;
    console.log(error, response);
    if (response.error) return false;
  }
};
