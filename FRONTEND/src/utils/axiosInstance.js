import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://urlshortner-afmm.onrender.com",
    timeout: 10000,
    withCredentials: true
})

export default axiosInstance ;

