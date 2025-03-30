import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getHotels = async () => {
  try {
    const response = await api.get("/hotels");
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels", error);
    throw error;
  }
};
