import React from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useGovernanceContractEvent } from "src/web3/hooks"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"
import { ProposalCard } from "@components/project/ProposalCard"

const Proposals: NextPage = () => {
  // const router = useRouter()

  const lastProposal = useGovernanceContractEvent()
  console.log(lastProposal)

  return (
    <Layout>
      <MetaData />
      <div className="container mx-auto mt-8 mb-16">
        <p className="text-black mt-1 text-sub leading-mid mb-8">
          Active Proposals
        </p>
        {lastProposal != null && <ProposalCard proposal={lastProposal} />}
      </div>
    </Layout>
  )
}

export default Proposals
