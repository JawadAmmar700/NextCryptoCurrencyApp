import "../styles/globals.css"
import type { AppProps } from "next/app"
import { MoralisProvider } from "react-moralis"
import Layout from "../layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId="M94GJlhErMTYVY4dZTOOCfvl5X6ysZwT8lvezdYy"
      serverUrl="https://qvqqveb02fu0.usemoralis.com:2053/server"
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>
  )
}

export default MyApp
