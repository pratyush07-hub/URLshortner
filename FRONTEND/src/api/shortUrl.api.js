import axiosInstance from "../utils/axiosInstance";


const createShortUrl = async (url) => {
    const { data } = await axiosInstance.post("/api/v1/shorturl/create-shorturl", {url})
    return data;
}

export { createShortUrl }