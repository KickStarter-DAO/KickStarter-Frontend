import {
    createClient,
    defaultChains,
    configureChains,
    chain
  } from 'wagmi'


  import { alchemyProvider } from 'wagmi/providers/alchemy'
  import { publicProvider } from 'wagmi/providers/public'
  
  import { InjectedConnector } from 'wagmi/connectors/injected'
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

  const { chains, provider } = configureChains([chain.polygonMumbai], [
    alchemyProvider({ apiKey: "https://polygon-mumbai.g.alchemy.com/v2/VB93DJmRg-zD-VUxpnChy0k87mr-P-EG"}),
    publicProvider(),
  ])


 export const client = createClient({
    autoConnect:true,
    connectors:[
        new InjectedConnector({
            chains,
            options:{
                name:"MetaMask",
                shimDisconnect:true
            }
        }),
        new WalletConnectConnector({
            chains,
            options:{
                qrcode:true
            }
        })
    ],
    provider,
    // webSocketProvider

 })

 export const shortenAddress = (address:string) => {
    if (!address) return null;
    return `${address.substr(0, 6)}...${address.substr(
        address.length - 4,
        address.length
    )}`;
};