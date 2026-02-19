import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/shared/config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Нет ответа от сервера — сеть или таймаут
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        toast.error("Превышено время ожидания. Проверьте интернет");
      } else {
        toast.error("Нет соединения с сервером");
      }
      return Promise.reject(error);
    }

    // Серверные ошибки (500+) — пользователь ничего не может с этим сделать
    if (error.response.status >= 500) {
      toast.error("Ошибка сервера. Попробуйте позже");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
