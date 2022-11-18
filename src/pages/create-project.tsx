import React, { useState } from "react"
import type { NextPage } from "next"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"
import { Modal } from "@components/common/Modal"
import { CreateProjectForm } from "@components/project/CreateProjectForm"
import { Button } from "@components/common/Button"

const CreateProject: NextPage = () => {
  const { isConnected, address } = useAccount()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  return (
    <Layout>
      <MetaData />
      <div className="h-8" />
      <div className="container mx-auto">
        <p className="text-black mt-1 text-sub leading-mid mb-8">
          Create a new project
        </p>
        {!isConnected && <p>Please, connect your wallet</p>}
        {isConnected && (
          <CreateProjectForm
            address={address!}
            onCreate={() => {
              setOpen(true)
            }}
          />
        )}
      </div>
      <Modal open={open} onClose={() => {}} label="Connect Wallet">
        <div className="flex flex-col gap-y-8">
          <p>
            Your proposal has been sumitted.
            <br />
            The DAO will now decide on whether or not accept the project.
          </p>
          <Button
            size="large"
            label="Go to proposal's page"
            primary
            onClick={() => {
              router.push("/proposals")
            }}
          />
        </div>
      </Modal>
      <div className="h-16" />
    </Layout>
  )
}

export default CreateProject
