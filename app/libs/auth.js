import axios from "axios";

require("dotenv").config();

export const login = async (username, password) => {
  const url = process.env.APP_REQUEST_ENDPOINT+"/api/login";

  try{
    const result = await axios.post(url, {
      username, password
    });
    return result.data;

  }catch(error){
    const {response} = error;
    console.log(response);
    return response.data;
  }
}

export const register = async (username, email, password) => {
  const url = process.env.APP_REQUEST_ENDPOINT+"/api/signup";

  try{
    const result = await axios.post(url, {
      username, email, password
    });
    console.log(result);
    return result.data;
  }catch(error){
    const {response} = error;
    return response.data;
  }
}