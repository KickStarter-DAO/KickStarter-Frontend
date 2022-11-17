import React from "react"
import type { NextPage, NextPageContext } from "next"
import { useAccount } from "wagmi"
import { useProjectHash } from "src/web3/hooks"
import { ProjectDetails } from "@components/project-details/ProjectDetails"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"

type ProjectProps = {
  projectId: string
}

const Project: NextPage<ProjectProps> = ({ projectId }) => {
  const { address: signer } = useAccount()

  const hash = useProjectHash(projectId)

  console.log("Hash", hash)

  return (
    <Layout>
      <MetaData />
      {hash == null || hash.length === 0 ? (
        <p>Fetching project&apos;s data from contract...</p>
      ) : (
        <ProjectDetails projectId={projectId} hash={hash} />
      )}
      <div className="h-8" />
    </Layout>
  )
}

export default Project

export async function getServerSideProps(context: NextPageContext) {
  const projectId = context.query?.id

  console.log({ hash: projectId })

  if (projectId == null) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  return {
    props: {
      projectId,
    },
  }
}