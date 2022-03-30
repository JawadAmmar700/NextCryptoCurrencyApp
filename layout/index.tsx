import React from "react"
import Account from "./account"
import News from "./news"
import Navbar from "../components/nav_bar"
import { LayoutProps } from "../libs/types"

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-h-screen bg-[#261E35] flex">
      <Navbar />
      <section className="flex-1">{children}</section>
      <div className="w-[350px] h-screen flex-none  text-white flex flex-col px-2 py-5">
        <div className="flex-none h-[200px]">
          <Account />
        </div>
        <div className="flex-auto overflow-y-scroll flex flex-col">
          <h1 className="font-bold text-xl px-2 py-5 ">Latest News</h1>
          <News />
        </div>
      </div>
    </div>
  )
}

export default Layout
