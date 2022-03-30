import React from "react"
import useBinaceWebSocket from "../../libs/hooks/useBinaceWebSocket"
import LineChart from "./line_chart"
import { ImSpinner5 } from "react-icons/im"

const Top_3 = () => {
  const { wsData } = useBinaceWebSocket()

  return (
    <div>
      {wsData.length > 0 ? (
        <div className="flex space-x-5 justify-center">
          {wsData.slice(0, 3).map((coin: any, id: number) => (
            <LineChart key={id} coin_data={coin} />
          ))}
        </div>
      ) : (
        <ImSpinner5 className="w-8 h-8 animate-spin text-blue-500 mx-auto mt-24" />
      )}
    </div>
  )
}

export default Top_3
