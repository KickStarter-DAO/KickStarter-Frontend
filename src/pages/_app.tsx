import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { WagmiConfig } from "wagmi"
import "@styles/globals.css"
import { client } from "@utils/connector"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default MyApp
