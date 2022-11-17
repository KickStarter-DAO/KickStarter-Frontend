import React from "react"
import { ethers } from "ethers"
import { useQuery } from "react-query"
import { useAccount } from "wagmi"
import { useProjectBalance, useProjectTimeLeft } from "src/web3/hooks"
import { Button } from "@components/common/Button"
import { secondsToDhms } from "@utils/seconds2Dhms"

const IPFS_BASE_URL = "https://ipfs.io/ipfs/"

type ProjectDetailsProps = {
  projectId: string
  hash: string
}

export function ProjectDetails({ projectId, hash }: ProjectDetailsProps) {
  const { address: signer } = useAccount()

  const { data, status } = useQuery("project", async () => {
    const res = await fetch(`${IPFS_BASE_URL}${hash}`)
    return res.json()
  })

  const balance = useProjectBalance(projectId)
  const timeLeft = useProjectTimeLeft(projectId)

  console.log(balance?.toString, timeLeft?.[0].toString())

  return (
    <>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
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
              <p className="text-xl text-teal-600 font-bold mt-3">
                US${" "}
                {balance != null ? ethers.utils.formatEther(balance) : "..."}
              </p>
              <p className="text-xs mt-1">pledged of US$ {data.amount} goal</p>

              {/* <p className="text-xl font-bold mt-3">66</p>
              <p className="text-xs mt-1">backers</p> */}

              <p className="text-xl font-bold mt-3">
                {timeLeft != null
                  ? secondsToDhms(timeLeft[0].toNumber())
                  : "..."}
              </p>
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
    </>
  )
}
