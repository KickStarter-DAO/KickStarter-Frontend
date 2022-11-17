import React, { useState, useEffect } from "react"
import type { NextPage, NextPageContext } from "next"
import { useQuery } from "react-query"
import { useAccount } from "wagmi"
import { useGovernanceContract } from "src/web3/hooks/useGovernanceContract"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"
import { Button } from "@components/common/Button"

const IPFS_BASE_URL = "https://ipfs.io/ipfs/"

type ProjectProps = {
  projectId: string
}

const Project: NextPage<ProjectProps> = ({ projectId }) => {
  const governanceContract = useGovernanceContract()
  const { address: signer } = useAccount()

  const [hash, setHash] = useState<string | null>(null)

  useEffect(() => {
    governanceContract?._getHashOfProjectData(projectId).then(setHash)
  }, [governanceContract, projectId])

  console.log(hash)

  const { data, status } = useQuery("project", async () => {
    if (hash == null) return
    const res = await fetch(`${IPFS_BASE_URL}${hash}`)
    return res.json()
  })

  console.log(data, status)

  return (
    <Layout>
      <MetaData />
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && hash != null && (
        <div className="container mx-auto border border-black">
          <div className="flex justify-center gap-x-8">
            <div className="">
              <iframe
                width="560"
                height="315"
                src={data.videoUrl.replace(
                  "https://youtu.be/",
                  "https://www.youtube.com/embed/",
                )}
                title={data.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex-1 border-t-8 border-teal-600">
              <p className="text-xl text-teal-600 font-bold mt-3">US$ 6,400</p>
              <p className="text-xs mt-1">pledged of US$ {data.amount} goal</p>

              <p className="text-xl font-bold mt-3">66</p>
              <p className="text-xs mt-1">backers</p>

              <p className="text-xl font-bold mt-3">21</p>
              <p className="text-xs mt-1">days to go</p>

              <div className="h-8" />
              <Button primary size="large" label="Back this project" />
            </div>
            {/* <img
              src={data.thumbnail.replace("ipfs://", IPFS_BASE_URL)}
              alt="cover"
              className="w-2/3"
            /> */}
          </div>
          <p>{JSON.stringify(data)}</p>
        </div>
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
