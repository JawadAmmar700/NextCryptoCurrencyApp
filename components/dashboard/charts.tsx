import MarketChart from "./market_chart"
import Top_3 from "./top_3"

const Charts = () => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="flex-none h-[200px]">
        <Top_3 />
      </div>
      <div className="flex flex-auto justify-center">
        <MarketChart />
      </div>
    </div>
  )
}

export default Charts
