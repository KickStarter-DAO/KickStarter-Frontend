import React, { useState } from "react"
import Link from "next/link"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { shortenAddress } from "@utils/connector"
import { Button as StaticButton } from "@components/common/Button"
import { Modal } from "@components/common/Modal"
import { CHAIN_ID } from "src/web3/constants"
import { useRouter } from "next/router"
import qflogo1 from "@public/assets/qflogo1.png"
import { FeatureCard } from "@components/landing/FeatureCard"
import dynamic from "next/dynamic"

const Button = dynamic<React.ComponentProps<typeof StaticButton>>(
  () => import("@components/common/Button").then((mod) => mod.Button),
  { ssr: false },
)

export const Header = () => {
  const [open, setOpen] = useState(false)
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      chainId: CHAIN_ID,
    })

  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

  const walletHandler = (connector: any) => {
    connect({ connector })
    closeWalletModal()
  }
  const closeWalletModal = () => {
    setOpen(!open)
  }

  return (
    <nav className="bg-white border-gray-200 px-2 md:px-4 py-2.5 dark:bg-green-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex items-center">
            <img src="../../../public/assets/qflogo1.png" className="mr-3 h-6 sm:h-9 " alt="Logo" />
            <span className="self-center text-2xl font-semibold text-green-800 font-bold text-[#118C4F] whitespace-nowrap dark:text-white ">Quickfund DAO</span>
        </div>

          <div id="mega-menu" className="hidden justify-center items-center w-full text-med md:flex md:w-auto md:order-1">
            <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                <li>
                    <Link href="/" className="block py-2 pr-4 pl-3 text-green-400 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-400 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">
                      Home
                    </Link>
                </li>

                <li>
                    <Link href="/about" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-400 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                    About
                    </Link>
                </li>

                <li>
                <Link href="/create-project" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-400 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                  Start A Business
                </Link>
                </li>

                <li>
                    <Link href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-400 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                      Vote
                    </Link>
                </li>

                <li>
                    <Link href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-400 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                      Invest
                    </Link>
                </li>

                <li>
                    <Link href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-400 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                      Contact
                    </Link>
                </li>
            </ul>

          <div className="mx-20">
            {!isConnected ? (
          <>
            <Button
              size="large"
              label="Connect Wallet"
              onClick={closeWalletModal}
            />
          </>
        ) : (
          <>
            <Button
              size="large"
              label={`${shortenAddress(address!)}`}
              onClick={() => {
                disconnect()
              }}
            />
          </>
        )}
        <>

          <Modal open={open} onClose={closeWalletModal} label="Connect Wallet">
            <div className="text-center flex justify-between space-x-12 font-bold">
              {connectors.map((connector) => (
                <button
                  className="bg-gray-500 p-2 rounded-lg text-[#f9f9f9]"
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => walletHandler(connector)}
                >
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                  {isLoading &&
                    connector.id === pendingConnector?.id &&
                    " (connecting)"}
                </button>
              ))}
            </div>
            {error && <div className="text-center my-2">{error.message}</div>}
          </Modal>
        </>
        </div>
      </div>
    </div>
  </nav>
  )
}
