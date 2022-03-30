import Account from "../../layout/account"
import Charts from "./charts"
import News from "../../layout/news"

const DashBoard = () => {
  const date_time = new Date().toLocaleString()

  return (
    <div className="w-full h-screen ">
      <div className=" text-white p-5 h-screen overflow-y-scroll hide-scroll-bar">
        <div className="sticky top-0">
          <h1 className="font-bold text-xl">DashBoard</h1>
          <p className="text-xs font-medium text-slate-200">{date_time}</p>
        </div>
        <Charts />
      </div>
    </div>
  )
}

export default DashBoard
