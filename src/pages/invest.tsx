import React from "react"
import type { NextPage } from "next"
import { useProjectGoesToFundingEvent, useProjectHash } from "src/web3/hooks"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"
import { ProjectCard } from "@components/project/ProjectCard"

const Invest: NextPage = () => {
  const lastProject = useProjectGoesToFundingEvent()
  console.log(lastProject)

  if (lastProject == null || lastProject.projectId == null) return null
  
  return (
    <InvestContent projectId={lastProject.projectId} />
  )
}

type InvestContentProps = {
  projectId: string
}

const InvestContent = ({ projectId }: InvestContentProps) => {
  const hash = useProjectHash(projectId)

  return (
    <Layout>
      <MetaData />
      <div className="container mx-auto mt-8 mb-16">
        <p className="text-black mt-1 text-sub leading-mid mb-8">
          Invest
        </p>
        {hash != null && (
          <ProjectCard
            projectId={projectId}
            hash={hash}
          />
        )}
      </div>
    </Layout>
  )
}

export default Invest
