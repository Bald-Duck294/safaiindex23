import axios from "axios";
import { Thermometer } from "lucide-react";
import API_BASE_URL from "../utils/Constant";
// export const fetchToiletFeatures = async () => {
//   try {
// const res =  await axios('http://localhost:8000/api/configurations/:Toilet_Features') //for now it is hardcoded 

// return res.data

// } catch (error) {

//     console.log(error , "error");
// //  throw new error;
// return error;
// }
// };


// lib/api/configurationsApi.js
// import axios from 'axios';

export const fetchToiletFeatures = async () => {
  const res = await axios.get(`${API_BASE_URL}/configurations/Toilet_Features`);
  return res.data;
};
