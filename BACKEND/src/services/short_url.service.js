import { shortUrl } from "../models/shorturl.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateNanoId } from "../services/helper.js"
import { checkCustomUrl } from "../dao/short_url.js";
import { ApiError } from "../utils/ApiError.js";

const createShortUrlWithoutUser = asyncHandler( async ( url ) => {
    const short_url = generateNanoId(7);
    if(!short_url){
        throw new ApiError(400, "short url not generated")
    }
    console.log(short_url)
    const newUrl = await shortUrl.create({
        full_url: url,
        short_url: short_url,
    })
    if (!newUrl) {
    console.error("shortUrl.create returned undefined");
    throw new ApiError(500, "Failed to generate new URL");
  }

  console.log("New URL saved to DB:", newUrl);
    return newUrl;
})
const createShortUrlWithUser = asyncHandler( async ( url , userId, slug=null) => {
    const short_url = slug || generateNanoId(7);
    if(!short_url){
        throw new ApiError(400, "short url not generated")
    }
    if(slug){
        const exists = await checkCustomUrl(slug)
        if(exists){
            throw new ApiError(400, "Ths custom url already exists")
        }
    }
    const newUrl = await shortUrl.create({
        full_url: url,
        short_url,
        user: userId
    })

    return newUrl
})

export { 
    createShortUrlWithoutUser,
    createShortUrlWithUser
}