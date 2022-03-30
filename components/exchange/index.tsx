import React, { useState } from "react"
import toast from "react-hot-toast"
import { FaAt } from "react-icons/fa"
import { RiCoinLine } from "react-icons/ri"
import Transaction from "./transaction"
import { useMoralis, useMoralisQuery } from "react-moralis"

const ExchangeDash = () => {
  const date_time = new Date().toLocaleString()
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const { Moralis, user, isAuthenticated } = useMoralis()
  const { data, error, isLoading } = useMoralisQuery(
    "transactions",
    query => query.ascending("createdAt"),

    [],
    {
      live: true,
    }
  )

  const hashToDecimal = (hash: any) => {
    return parseInt(hash, 16)
  }

  const exchange = async () => {
    if (!isAuthenticated)
      return toast("You are not authenticated, Please login")
    if (address === "" || amount === "") return toast("Please fill all fields")
    const options: any = {
      type: "native",
      amount: Moralis.Units.Token(amount),
      receiver: address,
    }
    setIsFetching(true)
    const result = await Moralis.transfer(options)
    setIsFetching(false)
    const transactionInstance = Moralis.Object.extend("transactions")
    const transaction = new transactionInstance()
    const object: any = {
      hash: result.hash,
      nonce: result.nonce,
      from: result.from,
      to: result.to,
      amount: amount,
      date: date_time,
      maxFeePerGas: hashToDecimal(result.maxFeePerGas?._hex),
      gasLimit: hashToDecimal(result.gasLimit._hex),
      gasPrice: hashToDecimal(result.gasPrice?._hex),
      maxPriorityFeePerGas: hashToDecimal(result.maxPriorityFeePerGas?._hex),
      ethAddress: user?.attributes.ethAddress,
    }
    transaction.save(object)
    setAddress("")
    setAmount("")
    toast("Transaction sent successfully")
  }

  return (
    <div className="p-5 flex flex-col w-full h-screen">
      <div className="sticky top-0  flex-none h-[60px] ">
        <div className="sticky top-0">
          <h1 className="font-bold text-xl text-slate-100">Exchange</h1>
          <p className="text-xs font-medium text-slate-200">{date_time}</p>
        </div>
      </div>
      <div className="flex-none h-[200px] flex flex-col items-center justify-center space-y-5 ">
        <div className="flex items-center justify-center space-x-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Address
            </label>
            <div className="relative w-[300px]">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FaAt className=" text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                id="email-adress-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0x00ecd...e946ae"
                onChange={e => setAddress(e.target.value)}
                value={address}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Amount
            </label>
            <div className="relative w-[300px]">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <RiCoinLine className=" text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                id="email-adress-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.01"
                onChange={e => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-5">
          <div className="w-[300px]">
            <button
              onClick={() => exchange()}
              type="button"
              disabled={isFetching}
              className="w-[300px] py-2.5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        <Transaction data={data} isLoading={isLoading} user={user} />
      </div>
    </div>
  )
}

export default ExchangeDash
