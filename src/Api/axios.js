import axios from "axios";

export const axiosInstance = axios.create({
 //localhost baseURL
  // baseURL: "http://127.0.0.1:5001/clone-75af5/us-central1/api",

  //deployed firebase function baseURL
  baseURL: "https://api-ptzm527cxa-uc.a.run.app",
 
  //deployed version of amazon server on render.com
  // baseURL: "https://amazon-api-deploy-whuv.onrender.com",
});
