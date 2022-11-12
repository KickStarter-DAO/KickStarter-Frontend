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
      {!isConnected && <p>Please, connect your wallet</p>}
      {isConnected && <CreateProjectForm address={address!} />}
    </Layout>
  )
}

export default CreateProject
