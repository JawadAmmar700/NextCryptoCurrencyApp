import { useEffect, useMemo, useState } from "react"
import { url_format } from "../config"
import { getMarkets } from "../queries"

const useBinaceWebSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [wsData, setWsData] = useState<any>([])

  const coins = useMemo(async () => {
    const data = await getMarkets()
    return data
  }, [])

  useEffect(() => {
    const ws = new WebSocket(url_format)
    ws.onopen = async () => setIsConnected(true)
    ws.onclose = () => setIsConnected(false)
    ws.onmessage = async event => {
      const coinsData = await coins
      const data = JSON.parse(event.data)
      const coin_name = data.k.s.split("USDT")[0].toLowerCase()
      coinsData.map((coin: any) => {
        if (coin.symbol === coin_name) {
          if (coin.current_price !== data.k.o) {
            coin.current_price = data.k.o
            coin.market_cap = coin.current_price * coin.circulating_supply
          } else {
          }
        }
      })
      setWsData([...coinsData])
    }
    return () => {
      if (ws?.readyState !== 3) ws.close()
    }
  }, [])

  return { wsData, isConnected }
}

export default useBinaceWebSocket
