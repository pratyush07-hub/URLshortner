import { asyncHandler } from "../utils/asynchandler.js";
import { shortUrl } from "../models/shorturl.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generateNanoId } from "../services/helper.js";


const createShortUrl = asyncHandler( async (req, res) => {
    const { url, userId } = req.body;
    const short_url = await generateNanoId(7);

    if(!url){
        throw new ApiError(400, "url not found")
    }
    if(!short_url){
        throw new ApiError(400, "short url not generated")
    }
    const newUrl = await shortUrl.create({
        full_url: url,
        short_url
    })
    if(!newUrl){
        throw new ApiError(400, "newurl not created")
    }
    if(userId){
        newUrl.user._id = userId
    }
    newUrl.save();
    const fullShortUrl = `${process.env.API_URL}/${newUrl.short_url}`

    return res.status(200).json(new ApiResponse(200, fullShortUrl , "short url is created successfully."))
})

const redirectShortUrl = asyncHandler( async (req, res) =>{
    const { shorturl } = req.params;
    if(!shorturl){
        throw new ApiError(400, "shorturl not fetched")
    }
    const url = await shortUrl.findOneAndUpdate(
        { short_url: shorturl },
        {
            $inc: {
                clicks: 1,
            }
        },
        {new: true},
    );
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