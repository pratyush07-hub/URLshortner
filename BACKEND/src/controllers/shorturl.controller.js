import { nanoid } from "nanoid";
import { asyncHandler } from "../utils/asynchandler.js";
import { shortUrl } from "../models/shorturl.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const createShortUrl = asyncHandler( async (req, res) => {
    const { url } = req.body;
    const short_url = nanoid(7);
    if(!url){
        throw new ApiError(400, "url not found")
    }

    const newUrl = await shortUrl.create({
        full_url: url,
        short_url
    })
    if(!newUrl){
        throw new ApiError(400, "newurl not created")
    }

    return res.status(200).json(new ApiResponse(200, newUrl, "short url is created successfully."))
})

const redirectShortUrl = asyncHandler( async (req, res) =>{
    const { shorturl } = req.params;
    const url = await shortUrl.findOne({
        short_url: shorturl
    })
    console.log(url.full_url);

    if(!url){
        throw new ApiError(400, "url not found")
    }
    return res.redirect(url.full_url)
})

export { 
    createShortUrl,
    redirectShortUrl,
 }