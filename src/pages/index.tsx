import React from "react"
import type { NextPage } from "next"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"
import { Hero } from "@components/landing/Hero"
import { Features } from "@components/landing/Features"
import  {Toaster} from "react-hot-toast"

const Home: NextPage = () => {
  return (
    <Layout>
      <Toaster/>
      <MetaData />
      <Hero />
      <Features />
      <div className="h-8" />
    </Layout>
  )
}

export default Home
