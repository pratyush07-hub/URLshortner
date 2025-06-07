import axiosInstance from "../utils/axiosInstance"

const registerUser = async (userData) => {
    const { data } = await axiosInstance.post("/api/v1/user/register" , userData)
    return data;
}
const loginUser = async (userData) => {
    const response = await axiosInstance.post("/api/v1/user/login", userData);
    return response.data;
}
const logoutUser = async () => {
    await axiosInstance.get("/api/v1/user/logout")
}
const currentUser = async () => {
    const { data } = await axiosInstance.get("/api/v1/user/me")
    return data;
}

export { 
    registerUser,
    loginUser,
    logoutUser,
    currentUser
}