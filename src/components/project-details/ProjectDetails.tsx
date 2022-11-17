import React, { useState } from "react"
import { ethers } from "ethers"
import { useQuery } from "react-query"
import { useAccount } from "wagmi"
import {
  useGovernanceContract,
  useProjectBalance,
  useProjectTimeLeft,
} from "src/web3/hooks"
import { Button } from "@components/common/Button"
import { secondsToDhms } from "@utils/seconds2Dhms"
import toast from "react-hot-toast"

const IPFS_BASE_URL = "https://ipfs.io/ipfs/"

type ProjectDetailsProps = {
  projectId: string
  hash: string
}

export function ProjectDetails({ projectId, hash }: ProjectDetailsProps) {
  const { address: signer } = useAccount()
  const [amount, setAmount] = useState("")
  const contract = useGovernanceContract()

  const { data, status } = useQuery("project", async () => {
    const res = await fetch(`${IPFS_BASE_URL}${hash}`)
    return res.json()
  })

  const balance = useProjectBalance(projectId)
  const timeLeft = useProjectTimeLeft(projectId)

  const fundProject = async () => {
    try {
      const res = await contract?.fund(projectId, {
        value: ethers.utils.parseEther(amount.toString()),
        gasLimit: '500000',
      })
      if (!res.hash) return
      await res.wait()
      toast.success(`You have successfully funded this project.`)
    } catch (error: any) {
      toast.error(error?.message)
      console.log(error)
    }
  }

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
              <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="amount"
                className="block my-2 w-[18%] p-1 rounded-lg  bg-inherit border-2 border-slate-500"
              />
              <Button
                onClick={fundProject}
                primary
                size="large"
                label="Back this project"
              />
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
