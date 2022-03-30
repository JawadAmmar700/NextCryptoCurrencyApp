import React, { useEffect, useState } from "react"

const ConverterDash = ({ data }: any) => {
  const date_time = new Date().toLocaleString()
  const [crypto, setCrypto] = useState("")
  const [local, setLocal] = useState("USD")
  const [value, setValue] = useState(0)
  const [converted, setConverted] = useState(0)

  const USD_TO_ANY = (e: number) => {
    const { current_price } = data.find(
      (item: any) => item.symbol.toLowerCase() === crypto
    )
    setConverted(e * current_price)
  }
  const EUR_TO_ANY = (e: number) => {
    const { current_price } = data.find(
      (item: any) => item.symbol.toLowerCase() === crypto
    )
    setConverted(e * current_price * 0.9)
  }
  const AED_TO_ANY = (e: number) => {
    const { current_price } = data.find(
      (item: any) => item.symbol.toLowerCase() === crypto
    )
    setConverted(e * current_price * 3.67)
  }

  const update = (e: any) => {
    switch (local) {
      case "USD":
        USD_TO_ANY(e)
        break
      case "EUR":
        EUR_TO_ANY(e)
        break
      case "AED":
        AED_TO_ANY(e)
        break
      default:
        console.log("first")
    }
  }

  useEffect(() => {
    if (!crypto || !local) return
    update(value)
  }, [crypto, local])

  return (
    <div className="p-5 flex flex-col w-full h-screen">
      <div className="sticky top-0 flex-none h-[50px]">
        <h1 className="font-bold text-xl text-slate-100">
          Convert Cryptocurrencies
        </h1>
        <p className="text-xs font-medium text-slate-200">{date_time}</p>
      </div>
      <div className="flex-auto flex flex-col items-center mt-16 space-y-5">
        <h1 className="font-bold text-sm text-slate-100 w-[400px]">
          Cryptocurrency Calculator & Converter Rates of our CryptoCurrency
          Converter based on the data provided by cryptocurrency echange APIs.
          The general rates aren't designed to be used for investment purposes.
        </h1>
        <div className="flex items-center space-x-5">
          <div className="w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Crypto Currency
            </label>
            <select
              onChange={e => setCrypto(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value="">
                select a coin
              </option>
              {data?.length > 0 &&
                data.map((item: any, id: number) => {
                  return (
                    <option key={id} value={item.symbol.toLowerCase()}>
                      {item.symbol.toUpperCase()}
                    </option>
                  )
                })}
            </select>
          </div>
          <div className=" w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Amount
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123"
              required
              min="0"
              onChange={e => {
                setValue(parseInt(e.target.value))
                update(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Local currency
            </label>
            <select
              onChange={e => setLocal(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="AED">AED</option>
            </select>
          </div>
          <div className=" w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Result
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123"
              required
              disabled
              value={converted}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConverterDash
