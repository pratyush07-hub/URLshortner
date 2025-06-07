import { shortUrl } from "../models/shorturl.model.js";
import { asyncHandler } from "../utils/asynchandler.js";

const checkCustomUrl = asyncHandler ( async (slug) => {
    return await shortUrl.findOne({short_url: slug})
})

export { checkCustomUrl }