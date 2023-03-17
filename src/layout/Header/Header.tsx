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
        ) : (
          <Button
            size="large"
            label={`${shortenAddress(address!)}`}
            onClick={() => {
              disconnect()
            }}
          />
        )}
      </div>
    </div>
  </nav>
  )
}
