import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import axios from "../../libs/axios"
import { ImSpinner5 } from "react-icons/im"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      position: "left" as const,
      ticks: {
        beginAtZero: true,
        callback: function (value: any) {
          return `${value / 1000000000}B`
        },
      },
    },
    y1: {
      type: "linear" as const,
      display: false,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
        display: false,
      },
    },
    y2: {
      type: "linear" as const,
      display: false,
      grid: {
        display: false,
        drawBorder: false,
      },

      position: "left" as const,
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
}

const list = ["bitcoin", "ethereum", "tether"]

const MarketChart = () => {
  const [coinData, setCoinData] = useState<any>([])

  const [value, setValue] = useState("1")

  const upadate = async () => {
    let coins = []
    for (let i = 0; i < list.length; i++) {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${list[i]}/market_chart?vs_currency=usd&days=${value}`
      )
      const data = await res.data
      coins.push(data)
    }
    setCoinData(coins)
  }

  useEffect(() => {
    upadate()
  }, [value])

  const data = {
    labels: coinData[0]?.prices
      .slice(coinData[0]?.prices.length - 10)
      .map((item: any) => new Date(item[0]).toLocaleTimeString("en-US")),
    datasets: [
      {
        label: "BTC",
        data: coinData[0]?.market_caps
          .slice(coinData[0]?.prices.length - 10)
          .map((item: any) => item[1]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "ETH",
        data: coinData[1]?.market_caps
          .slice(coinData[1]?.prices.length - 10)
          .map((item: any) => item[1]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "USDT",
        data: coinData[2]?.market_caps
          .slice(coinData[2]?.prices.length - 10)
          .map((item: any) => item[1]),
        borderColor: "rgb(223, 96, 23)",
        backgroundColor: "rgb(209, 127, 33)",
        yAxisID: "y2",
      },
    ],
  }

  return (
    <>
      {coinData.length > 0 ? (
        <div className="w-[790px] mt-5 bg-[#312840] rounded-lg p-3">
          <div className="w-full flex items-center justify-between">
            <h1 className="font-bold text-xl">Market cap</h1>
            <select
              onChange={e => setValue(e.target.value)}
              className="bg-[#312840] outline-none text-white font-bold py-2 px-2 rounded-lg border-2 border-[#261E35] focus:border-blue-500 focus:outline-none"
            >
              <option selected value="1">
                Daily
              </option>
              <option value="7">Weekly</option>
              <option value="30">Monthly</option>
            </select>
          </div>
          <div className="mt-4">
            <Line options={options} data={data} />
          </div>
        </div>
      ) : (
        <ImSpinner5 className="w-8 h-8 animate-spin text-blue-500 mx-auto mt-32" />
      )}
    </>
  )
}

export default MarketChart
