import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// a speacial axios instance for urls that require authentication
const authAxios = (token) => axios.create({
  baseURL: process.env.APP_REQUEST_ENDPOINT, 
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default authAxios;