import React, { useEffect, useState } from "react"
import { ImSpinner5 } from "react-icons/im"
import axios from "axios"

const News = () => {
  const [cryptoNews, setCryptoNews] = useState([])

  useEffect(() => {
    ;(async () => {
      const news = await axios.get(
        "https://crypto-news-live3.p.rapidapi.com/news",
        {
          headers: {
            "X-RapidAPI-Host": "crypto-news-live3.p.rapidapi.com",
            "X-RapidAPI-Key":
              "dd2e9f30bamsh72bd2a7fdb2f06cp1cd754jsn4efd9b2d2565",
          },
        }
      )
      setCryptoNews(news.data)
    })()
  }, [])
  return (
    <div className=" w-full overflow-y-scroll hide-scroll-bar flex-auto px-2 flex flex-col space-y-4 mb-4">
      {cryptoNews.length > 0 ? (
        cryptoNews.splice(0, 10).map((item: any, id: number) => (
          <a
            key={id}
            href={item.url}
            target="_blank"
            className="bg-[#312840] rounded p-2"
          >
            <div className="group">
              <h1 className="font-bold text-md text-slate-200 group-hover:text-blue-500 group-hover:underline">
                {item.source}
              </h1>
              <p className="px-2 font-bold text-xs text-slate-200 mt-2">
                {item.title}
              </p>
            </div>
          </a>
        ))
      ) : (
        <ImSpinner5 className="w-8 h-8 animate-spin text-blue-500 mx-auto mt-12" />
      )}
    </div>
  )
}

export default News
