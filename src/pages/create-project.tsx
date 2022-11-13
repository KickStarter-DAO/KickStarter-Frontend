import React from "react"
import type { NextPage } from "next"
import { useAccount } from "wagmi"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"
import { CreateProjectForm } from "@components/create-project/CreateProjectForm"

const CreateProject: NextPage = () => {
  const { isConnected, address } = useAccount()

  return (
    <Layout>
      <MetaData />
      <div className="h-8" />
      <div className="container mx-auto">
        <p className="text-black mt-1 text-sub leading-mid mb-8">
          Create a new project
        </p>
        {!isConnected && <p>Please, connect your wallet</p>}
        {isConnected && <CreateProjectForm address={address!} />}
      </div>
    </Layout>
  )
}

export default CreateProject
