import "../styles/globals.css"
import type { AppProps } from "next/app"
import { MoralisProvider } from "react-moralis"
import Layout from "../layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={`${process.env.NEXT_PUBLIC_MORALIS_ID}`}
      serverUrl={`${process.env.NEXT_PUBLIC_MORALIS_SERVER}`}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>
  )
}

export default MyApp
