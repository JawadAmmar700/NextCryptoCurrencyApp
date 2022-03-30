import { GetServerSideProps } from "next"
import React from "react"
import ConverterDash from "../components/converter"
import { getAllCurrencies } from "../libs/queries"

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllCurrencies()
  return {
    props: { data },
  }
}

const Converter = ({ data }: any) => {
  return <ConverterDash data={data} />
}

export default Converter
