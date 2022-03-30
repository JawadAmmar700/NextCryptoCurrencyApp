import { GetServerSideProps } from "next"
import React from "react"
import CurrenciesDash from "../components/currencies"
import { getAllCurrencies } from "../libs/queries"

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllCurrencies()
  return {
    props: { data },
  }
}

const Currencies = ({ data }: any) => {
  return <CurrenciesDash coins={data} />
}

export default Currencies
