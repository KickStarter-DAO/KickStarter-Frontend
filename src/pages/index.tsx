import React from "react"
import type { NextPage } from "next"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"
import { Hero } from "@components/landing/Hero"
import { Features } from "@components/landing/Features"

const Home: NextPage = () => {
  return (
    <Layout>
      <MetaData />
      <Hero />
      <Features />
    </Layout>
  )
}

export default Home
