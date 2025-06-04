import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../api/shortUrl.api.js";

const Homepage = () => {

  const [url, setUrl] = useState("https://www.google.com/")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)

  // const queryClient = useQueryClient()

  const updateValue = (e) => {
    setUrl(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createShortUrl(url)
    console.log("Submitted Url: ", data)
    setShortUrl(data)
  }

  // const query = useQuery({ queryKey: [] , queryFn: handleSubmit })

  // const mutation = useMutation({
  //   mutationFn: handleSubmit,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: [] })
  //   },
  // })

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <div className="bg-[#111] h-screen w-full flex justify-center items-center">
      <div className="bg-[#e7e5e5] w-[40%] h-[60%] rounded-md">
        <h1 className="text-4xl font-bold text-center mt-2">URL Shortner</h1>
        <form onSubmit={handleSubmit} action="" className="flex flex-col items-center mt-10">
          <label
            htmlFor="urlInput"
            className="mb-2 text-lg font-semibold text-blue-700"
          >
            Enter a URL to shorten:
          </label>
          <input
            id="urlInput"
            name="url"
            value={url}
            onChange={updateValue}
            type="text"
            placeholder="https://example.com"
            className="bg-white border-2 border-blue-500 w-[80%] p-2 rounded-md"
          />
          <button type="submit" className="bg-blue-500 w-[80%] mt-4 text-white p-2 rounded-md">Short URL</button>
        </form>

        {shortUrl && (
          <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold text-center mt-2 mb-2">Your Shortened URL: </h1>
            <div className="border-2 border-blue-500 flex justify-between w-[80%] rounded-md">
            <input
              value={shortUrl}
              readOnly
              type="text"
              placeholder="https://example.com"
              className="bg-white p-2 w-full rounded-md"
            />
            <button
            onClick={handleCopy}
            className={`px-8 rounded-r-md transition-colors duration-200 ${
              copied ? "bg-green-400 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}>
              {copied ? "Copied" : "Copy"}
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
