import axios from "axios";

const API_URL = "http://localhost:3000/rooms";

export const searchRooms = async (params: any) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};
