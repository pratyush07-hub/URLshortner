import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../api/shortUrl.api.js";

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com/");
  const [shortUrl, setShortUrl] = useState();
  const [customUrl, setCustomUrl] = useState();
  const [copied, setCopied] = useState(false);

  // const queryClient = useQueryClient()

  const updateValue = (e) => {
    const { name, value } = e.target;
    if (name === "url") setUrl(value);
    else if (name === "customurl") setCustomUrl(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createShortUrl(url, customUrl);
    console.log("Submitted Url: ", data);
    setShortUrl(data);
  };

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
  };
  return (
    <div className="w-full rounded-md">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col mt-10 ml-20"
      >
        <label
          htmlFor="urlInput"
          className="mb-2 text-lg font-semibold text-blue-700"
        >
          Enter a URL to shorten:
        </label>
        <input
          id="customurlInput"
          name="customurl"
          value={customUrl}
          onChange={updateValue}
          type="text"
          placeholder="customUrl"
          className="bg-white border-2 border-blue-500 w-[20%] p-2 rounded-md"
        />
        <input
          id="urlInput"
          name="url"
          value={url}
          onChange={updateValue}
          type="text"
          placeholder="https://example.com"
          className="bg-white border-2 border-blue-500 w-[80%] p-2 mt-4 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 w-[20%] mt-8 text-white p-2 rounded-md"
        >
          Short URL
        </button>
      </form>

      {shortUrl && (
        <div className="flex flex-col ml-20 mt-10">
          <h1 className="text-2xl font-bold mt-2 mb-2">Your Shortened URL: </h1>
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
                copied
                  ? "bg-green-400 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
