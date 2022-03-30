import React from "react"
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
import { FaExchangeAlt } from "react-icons/fa"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
}

const LineChart = ({ coin_data }: any) => {
  const data = {
    labels: coin_data?.market_chart.prices
      .slice(coin_data?.market_chart.prices.length - 10)
      .map((item: any) => new Date(item[0]).toLocaleTimeString("en-US")),
    datasets: [
      {
        data: coin_data?.market_chart.prices
          .slice(coin_data?.market_chart.prices.length - 10)
          .map((item: any) => item[1]),
        borderColor: `#B561A1`,
        backgroundColor: `#B561A1}`,
      },
    ],
  }
  return (
    <div className="w-[250px] bg-[#312840]  py-3 px-5 rounded-lg">
      <div className="relative flex items-center justify-between">
        <img
          src={coin_data?.image}
          alt=""
          className="w-[40px] h-[40x] absolute -top-[32px] left-2/4  transformm -translate-x-1/2"
        />
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-slate-200">
            {coin_data?.symbol.toUpperCase()}
          </p>
          <FaExchangeAlt className="w-3 h-3 text-slate-200" />
          <p className="text-sm font-medium text-slate-200">USD</p>
        </div>
        <p
          className={`text-sm font-medium  ${
            Math.sign(coin_data?.market_cap_change_percentage_24h) === -1
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {coin_data?.market_cap_change_percentage_24h}%
        </p>
      </div>
      <p className="text-sm font-bold text-slate-200 mt-3">
        {!coin_data?.current_price
          ? ""
          : Math.round(coin_data?.current_price * 100) / 100}
        $
      </p>
      <Line className="mt-2" options={options} data={data} />
    </div>
  )
}

export default LineChart
