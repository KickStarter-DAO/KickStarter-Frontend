import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import { useQuery } from "react-query"
import { useAccount } from "wagmi"
import { useProjectBalance, useProjectTimeLeft, useCountdown } from "src/web3/hooks"
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
  const count = useCountdown(0)

  return (
    <>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div className="container mx-auto pt-8">
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
                  ? secondsToDhms(timeLeft[0].toNumber() - count)
                  : "..."}
              </p>
              <p className="text-xs mt-1">days to go</p>

              <div className="h-4" />
              <Button primary size="large" label="Back this project" />
 
              <p className="text-xs mt-4">
                <u>All or nothing</u>. This project will only be funded if it reaches its goal before the deadline</p>
            </div>
          </div>
          <h2 className="text-xl mt-8 mb-4">Project description</h2>
          <p>{data?.description || "TBD"}</p>
        </div>
      )}
    </>
  )
}
