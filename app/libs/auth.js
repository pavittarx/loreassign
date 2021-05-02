import axios from "axios";
import authAxios from "./../utils/axios";

require("dotenv").config();

export const login = async (username, password) => {
  const url = process.env.APP_REQUEST_ENDPOINT + "/api/login";

  try {
    const response = await axios.post(url, {
      username,
      password,
    });

    const { data } = response;
    window.localStorage.setItem("token", data.data.token);
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
  const url = "/api/auth";
  const token = window.localStorage.getItem("token");

  try {
    const {data} = await authAxios(token).get(url);
    if (data.success) return true;
    
  } catch (error) {
    const { response } = error;
    console.log(error, response);
    if (response.error) return false;
  }
};
