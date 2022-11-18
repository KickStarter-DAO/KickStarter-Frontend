import React, { useState } from "react"
import { ethers, BigNumber } from "ethers"
import { useAccount } from "wagmi"
import {
  useGovernanceContract,
  useProjectBalance,
  useProjectTimeLeft,
  useCountdown,
  useIPFS,
} from "src/web3/hooks"
import toast from "react-hot-toast"
import { Button } from "@components/common/Button"
import { secondsToDhms } from "@utils/seconds2Dhms"
import { FUNC_FUND } from "src/web3/constants"

type ProposalDetailsProps = {
  proposalId: string
  hash: string
  host: string | undefined
}

export function ProposalDetails({
  proposalId,
  hash,
  host,
}: ProposalDetailsProps) {
  const { address: signer } = useAccount()
  const [amount, setAmount] = useState("")
  const contract = useGovernanceContract()

  const { data, status } = useIPFS("proposal", hash)

  const voteProposal = async (support: 0 | 1) => {
    try {
      const res = await contract?.castVote(proposalId, support, {
        gasLimit: "500000",
      })
      if (!res.hash) return
      await res.wait()
      toast.success(`Vote cast successully!`)
    } catch (error: any) {
      toast.error(error?.message)
      console.log(error)
    }
  }

  const queueAndExecute = async () => {
    try {
      const projectId = (await contract?.getCurrentProjectId()) as BigNumber

      const bytes32Hash = ethers.utils.sha256(hash)
      // console.log(hexHash)
      // const bytes32Hash =
      //   [...new Array(64 - hexHash.length).fill(0)].join("") + hexHash
      // console.log(bytes32Hash)

      const encode = contract?.interface.encodeFunctionData(FUNC_FUND, [
        bytes32Hash,
        data.amount,
        data.time,
        projectId?.toString(),
      ])

      const queueTx = await contract?.queue(
        [signer],
        [0],
        [encode],
        bytes32Hash,
      )
      if (!queueTx.hash) return
      await queueTx.wait()

      const executeTx = await contract?.execute(
        [signer],
        [0],
        [encode],
        bytes32Hash,
      )
      if (!executeTx.hash) return
      await executeTx.wait()

      toast.success(`Queue and Execute success!`)
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
        <div className="container mx-auto pt-8">
          <h1 className="text-xl font-bold mb-4">{data.name}</h1>
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
              <p className="text-xl text-teal-600 font-bold mt-3">US$ {0}</p>
              <p className="text-xs mt-1">pledged of US$ {data.amount} goal</p>

              {/* <p className="text-xl font-bold mt-3">66</p>
              <p className="text-xs mt-1">backers</p> */}

              <p className="text-xl font-bold mt-3">
                {secondsToDhms(data.time)}
              </p>
              <p className="text-xs mt-1">days to go</p>

              <div className="h-8" />

              <div className="flex gap-x-2">
                <Button
                  onClick={() => {
                    voteProposal(1)
                  }}
                  primary
                  size="large"
                  label="Vote FOR this project"
                />
                <Button
                  onClick={() => {
                    voteProposal(0)
                  }}
                  size="large"
                  label="Vote AGAINST this project"
                />
                <Button
                  onClick={queueAndExecute}
                  size="large"
                  label="Queue &amp; Execute"
                />
              </div>

              {/* <p className="text-xs mt-4">
                <u>All or nothing</u>. This project will only be funded if it
                reaches its goal before the deadline
              </p> */}

              <div
                title="Share"
                className="cursor-pointer mt-4 rounded-full bg-teal-600 w-8 h-8 p-2"
                onClick={() => {
                  navigator.clipboard.writeText(`${host}/${proposalId}/${hash}`)
                  toast.success("URL copied to clipboard!")
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  viewBox="0 0 32 32"
                >
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-xl mt-8 mb-4">Project description</h2>
          <p>{data?.description || "TBD"}</p>
        </div>
      )}
    </>
  )
}
