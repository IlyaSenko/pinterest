import axios from "axios";

export default function useApiInstance() {
  const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 1000,
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_API_ACCESS_KEY}`,
    },
  });

  return apiInstance;
}
