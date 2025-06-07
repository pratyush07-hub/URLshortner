import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    timeout: 10000,
    withCredentials: true
})

export default axiosInstance ;

