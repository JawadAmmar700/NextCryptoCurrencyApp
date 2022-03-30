import React from "react"
import { FaViacoin } from "react-icons/fa"
import { MdSpaceDashboard } from "react-icons/md"
import { BsCurrencyExchange } from "react-icons/bs"
import { GiTwoCoins } from "react-icons/gi"
import { BiLogOut } from "react-icons/bi"
import { SiConvertio } from "react-icons/si"
import useTrack_page from "../../libs/hooks/useTrack_page"
import Link from "next/link"
import { useMoralis } from "react-moralis"

const Navbar = () => {
  const { logout } = useMoralis()
  const path = useTrack_page()
  return (
    <div className="sticky top-0 left-0 w-[80px] h-screen flex-none flex flex-col items-center justify-start space-y-8 z-50">
      <Link href="/">
        <FaViacoin className=" w-10 h-10 mx-auto text-orange-500 cursor-pointer mt-5" />
      </Link>
      <div className="flex flex-col space-y-3">
        <Link href="/">
          <div
            className={`${
              path === "" && "bg-orange-500"
            } nav-link-wrapper group`}
          >
            <MdSpaceDashboard className="nav-icon" />
            <p className="nav-text">Dashboard</p>
          </div>
        </Link>
        <Link href="/currencies">
          <div
            className={`${
              path === "currencies" && "bg-orange-500"
            } nav-link-wrapper group`}
          >
            <GiTwoCoins className="nav-icon" />
            <p className="nav-text">Currencies</p>
          </div>
        </Link>
        <Link href="/exchange">
          <div
            className={`${
              path === "exchange" && "bg-orange-500"
            } nav-link-wrapper group`}
          >
            <BsCurrencyExchange className="nav-icon" />
            <p className="nav-text">Exchange</p>
          </div>
        </Link>
        <Link href="/converter">
          <div
            className={`${
              path === "converter" && "bg-orange-500"
            } nav-link-wrapper group`}
          >
            <SiConvertio className="nav-icon" />
            <p className="nav-text">Converter</p>
          </div>
        </Link>
        <div onClick={() => logout()} className={` nav-link-wrapper group`}>
          <BiLogOut className="nav-icon" />
          <p className="nav-text">Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
