import { markets } from "./config"
import axios from "./axios"
const getHistory = async (data: any) => {
  const coins = await data
  const iterations: number = coins.length
  for (let i = 0; i < iterations; i++) {
    const res = await axios.get(
      `${coins[i].id}/market_chart?vs_currency=usd&days=1`
    )
    const market_chart = await res.data
    coins[i].market_chart = market_chart
  }
  return coins
}

export const getMarkets = async () => {
  const res = await axios.get(markets)
  const data = await res.data
  const market_data_history_coins = await getHistory(data)
  return market_data_history_coins
}

export const getAllCurrencies = async () => {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d"
  )
  const data = await res.data
  return data
}
