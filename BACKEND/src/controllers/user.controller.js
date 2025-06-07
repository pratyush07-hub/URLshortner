import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";



const registerUser = asyncHandler( async (req, res) => {
    const { email, password, name} = req.body;
    console.log("Incoming register data:", req.body);

    
    if ([email, name, password].some(field => typeof field !== "string" || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await User.findOne({email: email})

    if(existedUser){
        throw new ApiError(400, "User already exists")
    }

    const newUser = await User.create({
        name: name,
        email: email,
        password: password,
    })
    
    const createdUser = await User.findById(newUser._id).select("-password  -refreshToken")
    const accessToken = createdUser.generateAccessToken()

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const options = {
        httpOnly: true,
        secure: true
    }
    res.cookie("accessToken", accessToken ,options)
    return res.status(200).json(new ApiResponse( 200, createdUser, "User registered successfully"))
})

const loginUser = asyncHandler( async (req, res) => {
    const { email , password } = req.body;
    const user = await User.findOne({ email })

    if(!user){
        throw new ApiError(400, "Invalid user credentials")
    }
    const isPasswordCorrect = user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid user credentials")
    }
    const accessToken = user.generateAccessToken()
    const options = {
        httpOnly: true,
        secure: true
    }
    const existedUser = await User.findById(user._id).select("-password  -refreshToken")
    res.cookie("accessToken", accessToken ,options)
    return res.status(200).json(new ApiResponse( 200, existedUser, "User LoggedIn successfully"))

})
const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {new: true}
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", options).json(new ApiResponse(200, {}, "User logged out successfully"))

})
const getCurrentUser = asyncHandler( async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"))
})

export { 
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
 }