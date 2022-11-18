import React from "react"
import { useRouter } from "next/router"
import { Button } from "@components/common/Button"
// import styles from '../../styles/globals.css"

export function Hero() {
  const router = useRouter()

  return (
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center h-[900px]">
      <div className="container mx-auto pt-24">
        <h3 className="text-white font-bold text-green-800 my-2 text-hero leading-large">
          Fund the Future of Crypto
        </h3>
        <h3 className="text-white italic text-outline-black outline-width text-green-700  ml-12 mt-2 text-sub leading-mid">
          Quicker Than Making A Coffee...
        </h3>
        <p className="text-white text-sub font-semibold mt-28 leading-mid">
          Start funding your project in less than 5 minutes!
        </p>
        <div className="flex gap-12 mt-28">
          <Button
          className="text-white text-3xl font-semibold rounded-lg text-base px-12 py-7 bg-gradient-to-r from-lime-400 via-lime-500 to-lime-700 hover:bg-gradient-to-br hover:text-green-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            size="large"
            label="Start A Business!"
            onClick={() => {
              router.push("/create-project")
            }}
          />
          {/* <Button
            size="large"
            backgroundColor="#fff"
            label="Become an Investor"
          /> */}
        </div>
      </div>
    </div>
  )
}
