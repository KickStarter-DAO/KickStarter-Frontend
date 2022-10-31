import type { AppProps } from "next/app"
import { WagmiConfig } from "wagmi"
import "@styles/globals.css"
import { client } from "@utils/connector"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
