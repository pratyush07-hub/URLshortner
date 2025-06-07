import { asyncHandler } from "../utils/asynchandler.js";
import { shortUrl } from "../models/shorturl.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generateNanoId } from "../services/helper.js";
import { checkCustomUrl } from "../dao/short_url.js";

const createShortUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(400, "URL not provided");
  }
  const short_url = generateNanoId(7);
  if (!short_url) {
    throw new ApiError(400, "short url not generated");
  }

  const newUrl = await shortUrl.create({
    full_url: url,
    short_url: short_url,
  });

  if (!newUrl || !newUrl.short_url) {
    throw new ApiError(500, "Failed to generate new URL");
  }

  const fullShortUrl = `${process.env.API_URL}/${newUrl.short_url}`;

  return res
    .status(200)
    .json(
      new ApiResponse(200, fullShortUrl, "Short URL created successfully.")
    );
});




const createShortUrlAuth = asyncHandler(async (req, res) => {
  const { url, slug } = req.body;
  if (!url) {
    throw new ApiError(400, "url not found");
  }
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
        user: req.user._id
    })
  // const newUrl = await createShortUrlWithUser(url, req.user._id, slug);
  if (!newUrl) {
    throw new ApiError(500, "Failed to generate short URL");
  }

  const fullShortUrl = `${process.env.API_URL}/${newUrl.short_url}`;

  return res
    .status(200)
    .json(
      new ApiResponse(200, fullShortUrl, "short url is created successfully.")
    );
});




const redirectShortUrl = asyncHandler(async (req, res) => {
  const { shorturl } = req.params;
  if (!shorturl) {
    throw new ApiError(400, "shorturl not fetched");
  }
  const url = await shortUrl.findOneAndUpdate(
    { short_url: shorturl },
    {
      $inc: {
        clicks: 1,
      },
    },
    { new: true }
  );

  if (!url) {
    throw new ApiError(404, "url not found");
  }
  console.log(url.full_url);

  return res.redirect(url.full_url);
});

const getStats = asyncHandler( async (req, res) => {
  const stats = await shortUrl.aggregate([
    { $match: { user: req.user._id } },
    
  ])
})


export { createShortUrl, createShortUrlAuth, redirectShortUrl };
