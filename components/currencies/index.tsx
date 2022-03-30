import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { ImSpinner5 } from "react-icons/im"

const CurrenciesDash = ({ coins }: any) => {
  const [text, setText] = useState("")
  const date_time = new Date().toLocaleString()

  return (
    <div className="p-5 flex flex-col">
      <div className="sticky top-0 flex items-center justify-between flex-none h-[60px]">
        <div className="">
          <h1 className="font-bold text-xl text-slate-100">Cryptocurrencies</h1>
          <p className="text-xs font-medium text-slate-200">{date_time}</p>
        </div>
        <div>
          <div className="w-[250px] h-[40px] flex items-center space-x-2 bg-[#312840] p-2 rounded-lg">
            <FaSearch className="text-slate-200 w-4 h-4 flex-none " />
            <input
              type="text"
              className="flex-auto h-[40px] rounded-lg bg-transparent outline-none border-0 text-slate-200 text-sm font-medium"
              placeholder="search..."
              onChange={e => setText(e.target.value)}
              value={text}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 w-full flex-auto overflow-y-scroll h-[460px]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#261E35] dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                24%
              </th>
              <th scope="col" className="px-6 py-3">
                7d%
              </th>
              <th scope="col" className="px-6 py-3">
                Market cap
              </th>
              <th scope="col" className="px-6 py-3">
                Volume(24%)
              </th>
              <th scope="col" className="px-6 py-3">
                circulating supply
              </th>
            </tr>
          </thead>
          <tbody>
            {coins?.length > 0 &&
              coins
                .filter((item: any) => {
                  if (text === "") return coins
                  if (item.name.toLowerCase().includes(text.toLowerCase())) {
                    return item
                  }
                })
                .map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-[#261E35]  dark:border-gray-700 text-slate-100"
                  >
                    <td className="px-3 py-4 flex items-center space-x-2">
                      <img
                        src={item.image}
                        alt=""
                        className="w-[25px] h-[25px] rounded-full"
                      />
                      <p>{item.name}</p>
                    </td>
                    <td className="px-3 py-4">${item.current_price}</td>
                    <td className="px-3 py-4">
                      {item.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="px-3 py-4">
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </td>
                    <td className="px-3 py-4">
                      $
                      {item.market_cap
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td className="px-3 py-4">
                      <p className="text-left text-md text-slate-100">
                        ${item.total_volume}
                      </p>
                      <p className="text-left text-xs text-slate-200">
                        {(item.total_volume / item.current_price)
                          .toFixed(0)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        <span className="ml-1">
                          {item.symbol.toUpperCase()}
                        </span>
                      </p>
                    </td>
                    <td className="px-3 py-4">
                      {item.circulating_supply
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      <span className="ml-1">{item.symbol.toUpperCase()}</span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CurrenciesDash
