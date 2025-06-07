import axiosInstance from "../utils/axiosInstance";


const createShortUrl = async (url, slug) => {
    const { data } = await axiosInstance.post("/api/v1/shorturl/create-shorturl-auth", {url, slug})
    return data;
}

export { createShortUrl }