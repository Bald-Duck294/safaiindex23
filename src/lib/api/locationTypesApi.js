import axios from "axios";
import API_BASE_URL from "../utils/Constant";
// const BASE = '/api/location-types';
const BASE = `${API_BASE_URL}/location-types`;

const locationTypesApi = {
  getAll: async () => {
    const res = await axios.get(`${BASE}`);
    return res.data;
  },
  create: async (data) => {
    console.log(data, "data ");
    const res = await axios.post(`${BASE}`, data);
    return res.data;
  },
  //   update: async (id, data) => {
  //     console.log(data, id, "update");
  //     const res = await axios.patch(`${BASE}/${id}`, data);
  //     return res.data;
  //   },
  update: async (id, body) => {
    console.log('update' , id , body);
    const res = await fetch(`${BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  },

  updateParent: async (id, data) => {
    const res = await axios.patch(`${BASE}/${id}`, data);
    return res.data;
  },
  markAsToilet: async (id) => {
    const res = await axios.patch(`${BASE}/${id}/mark-toilet`);
    return res.data;
  },
};

export default locationTypesApi;
