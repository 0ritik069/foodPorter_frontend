import { baseUrl } from "../features/Api/BaseUrl";
import axios from "axios";

export const getApi = async (credentials) => {
  try {
    const response = await axios.post(
      `${baseUrl}auth/login/admin`,
      credentials
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};
