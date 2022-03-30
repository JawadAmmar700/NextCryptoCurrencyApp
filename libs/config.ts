export const streams = [
  "btcusdt",
  "ethusdt",
  "usdtusdt",
  "bnbusdt",
  "usdcusdt",
  "xrpusdt",
  "adausdt",
  "lunausdt",
  "solusdt",
  "avaxusdt",
  "dotusdt",
]

export const markets =
  "markets?vs_currency=usd&order=market_cap_desc&per_page=3/&page=1&sparkline=false"

export const url_format = `wss://stream.binance.com:9443/ws/${streams.join(
  "@kline_1m/"
)}`
