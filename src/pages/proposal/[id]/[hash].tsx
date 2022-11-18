import React from "react"
import type { NextPage, NextPageContext } from "next"
import { ProposalDetails } from "@components/project/ProposalDetails"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"

type ProposalProps = {
  proposalId: string
  hash: string
  host: string | undefined
}

const Proposal: NextPage<ProposalProps> = ({ proposalId, hash, host }) => {
  return (
    <Layout>
      <MetaData />
      <ProposalDetails proposalId={proposalId} hash={hash} host={host} />
      <div className="h-8" />
    </Layout>
  )
}

export default Proposal

export async function getServerSideProps(context: NextPageContext) {
  const proposalId = context.query?.id
  const hash = context.query?.hash
  const host = context.req?.headers.host

  if (proposalId == null || hash == null) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  return {
    props: {
      proposalId,
      hash,
      host,
    },
  }
}
