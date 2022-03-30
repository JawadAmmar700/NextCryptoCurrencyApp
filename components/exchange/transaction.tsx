import React from "react"
import { ImSpinner5 } from "react-icons/im"

const Transaction = ({ data, isLoading, user }: any) => {
  const format = (id: any) => {
    const split1 = id.slice(0, 5)
    const split2 = id.slice(id.length - 5, id.length)
    return split1.concat("...", split2)
  }
  return (
    <div>
      <div className="sticky top-0">
        <h1 className="font-bold text-xl text-slate-100">Transactions</h1>
      </div>
      {!user ? (
        <h1 className="w-full text-center mt-12 text-slate-100 font-bold">
          Login to view your latest transactions
        </h1>
      ) : (
        <>
          {!isLoading ? (
            <div className="relative  overflow-y-scroll h-[280px] mt-4">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className=" sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      CreatedAt
                    </th>
                    <th scope="col" className="px-6 py-3">
                      From
                    </th>
                    <th scope="col" className="px-6 py-3">
                      To
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      nonce
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Priority Fee
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Max Fee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 &&
                    data
                      .filter((item: any) => {
                        if (
                          item.attributes.ethAddress ===
                          user?.attributes.ethAddress
                        ) {
                          return item
                        }
                      })
                      .map((item: any, id: number) => (
                        <tr
                          key={id}
                          className="bg-white border-b dark:bg-transparent dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-transparent"
                        >
                          <td className="px-6 py-4 ">
                            {new Date(
                              item.attributes.createdAt
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            {format(item.attributes.from)}
                          </td>
                          <td className="px-6 py-4">
                            {format(item.attributes.to)}
                          </td>
                          <td className="px-6 py-4">
                            {item.attributes.amount}ETH
                          </td>
                          <td className="px-6 py-4">{item.attributes.nonce}</td>
                          <td className="px-6 py-4">
                            {item.attributes.maxPriorityFeePerGas}
                          </td>
                          <td className="px-6 py-4">
                            {item.attributes.maxFeePerGas}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ImSpinner5 className="w-8 h-8 animate-spin text-blue-500 mt-16 ml-96" />
          )}
        </>
      )}
    </div>
  )
}

export default Transaction
