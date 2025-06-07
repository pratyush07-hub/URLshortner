import axiosInstance from "../utils/axiosInstance";


const createShortUrl = async (url, slug) => {
    const { data } = await axiosInstance.post("/api/v1/shorturl/create-shorturl-auth", {url, slug})
    return data;
}
const getRecentUrls = async ( ) => {
    const response = await axiosInstance.get("/api/v1/shorturl/recenturls")
    return response.data;
}

export { createShortUrl, getRecentUrls }