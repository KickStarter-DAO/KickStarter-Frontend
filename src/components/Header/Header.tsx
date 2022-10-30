import React, { useState } from "react"
import { Button } from "@components/Button"
import ModalWrapper from "@components/ModalWrapper"
import Image from "next/image"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { shortenAddress } from "utils/connector"
// import './header.css';

type User = {
  name: string
}

interface HeaderProps {
  user?: User
  onLogin: () => void
  onLogout: () => void
  onCreateAccount: () => void
}

export const Header = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
}: HeaderProps) => {
  const [open, setOpen] = useState(false)
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

  const walletHandler = (connector: any) => {
    connect({ connector })
    // closeWalletModal();
  }
  const closeWalletModal = () => {
    setOpen(!open)
  }
  return (
    <header>
      <div className="wrapper">
        <div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                fill="#FFF"
              />
              <path
                d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                fill="#555AB9"
              />
              <path
                d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                fill="#91BAF8"
              />
            </g>
          </svg>
          <h1>Acme</h1>
        </div>
        {!isConnected ? (
          <Button
            size="large"
            label="Connect Wallet"
            onClick={closeWalletModal}
          />
        ) : (
          <Button
            onClick={disconnect}
            size="large"
            label={`${shortenAddress(address!)}`}
          />
        )}
        <>
          <ModalWrapper
            open={open}
            onClose={closeWalletModal}
            label="Connect Wallet"
          >
            <div className="text-center flex justify-between space-x-12 font-bold ">
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
          </ModalWrapper>
        </>
      </div>
    </header>
  )
}
