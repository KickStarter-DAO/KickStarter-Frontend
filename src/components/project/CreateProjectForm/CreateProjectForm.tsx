import React, { useState } from "react"
import { ethers, BigNumber } from "ethers"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Address, useAccount } from "wagmi"
import { ipfs } from "@services/ipfs"
import { Button } from "@components/common/Button"
import { FieldError } from "@components/common/FieldError"
import { useGovernanceContract } from "src/web3/hooks/useGovernanceContract"
import toast, { Toaster } from "react-hot-toast"
import { FUNC_FUND,GOVERNANCE_CONTRACT_ADDRESS } from "src/web3/constants"

const MAX_FILE_SIZE = 500000
const DAY = 60 * 60 * 24
const WEEK = 7 * DAY // amount of secs in a week time
const MONTH = 30 * DAY // amount of secs in a month time

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

const schema = z.object({
  address: z.string().min(16, { message: "You are not logged in!" }),
  name: z.string().min(1, { message: "Name is required" }),
  amount: z.number().int().gt(1, { message: "Funding Goal is required" }),
  time: z.number().int().gt(1, { message: "Funding Time is required" }),
  website: z.string().min(1, { message: "Website is required" }),
  videoUrl: z.string(),
  description: z.string().min(1, { message: "Description is required" }),
  thumbnail: z
    .any()
    .refine((files) => files?.length === 1, "Thumbnail is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    ),
})

type CreateProjectFormProps = {
  address: Address
  onCreate: () => void
}

// TODO: use WYSIWYG.
export function CreateProjectForm({
  address,
  onCreate,
}: CreateProjectFormProps) {
  const contract = useGovernanceContract()
  const { address: signer } = useAccount()

  // const encode = iface.encodeFunctionData()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const [disabled, setDisabled] = useState(false)

  const handleUpload = async (data: any) => {
    setDisabled(true)

    try {
      const { thumbnail, ...rest } = data
      // Upload thumbnail to IPFS to get CID hash back.
      const thumbnailCID = await ipfs.add(thumbnail[0])
      // Attach thumbnail CID to the rest of the form's data
      // and upload it to IPFS getting a CID hash back.
      const obj = { ...rest }
      obj["thumbnail"] = `ipfs://${thumbnailCID.path}`
      const json = JSON.stringify(obj, null, 2)
      const jsonCID = await ipfs.add(json)
      console.log("Upload to IPFS success", jsonCID.path)

      const { amount, time } = data
      const resFee = await contract?.paySubmitFee({
        value: ethers.utils.parseEther("0.01"),
      })
      if (!resFee.hash) return
      await resFee.wait()

      const projectId = (await contract?.getCurrentProjectId()) as BigNumber
      console.log("ProjectId", projectId.toString())

      const encode = contract?.interface.encodeFunctionData(FUNC_FUND, [
        jsonCID.path,
        amount,
        time,
        projectId?.toString(),
      ])

      console.log(`Encode data= ${encode}`)

      const proposeTxn = await contract?.propose(
        [GOVERNANCE_CONTRACT_ADDRESS],
        [0],
        [encode],
        jsonCID.path,
      )

      if (!proposeTxn) return
      await proposeTxn.wait()
      toast.success("Proposal created successfully!")
      onCreate()
    } catch (err: any) {
      toast.error(err)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleUpload)}>
      <input
        type="hidden"
        id="address"
        {...register("address")}
        value={address}
      />
      <FieldError msg={errors.address?.message} />

      <label htmlFor="name">Project Name*</label>
      <input
        type="text"
        id="name"
        {...register("name")}
        placeholder="Project name"
      />
      <FieldError msg={errors.name?.message} />

      <label htmlFor="amount">Funding Goal*</label>
      <input
        type="number"
        id="amount"
        {...register("amount", {
          valueAsNumber: true,
        })}
        placeholder="Funding goal/amount in USD"
      />
      <FieldError msg={errors.amount?.message} />

      <label htmlFor="time">Funding Time*</label>
      <select
        id="time"
        {...register("time", {
          valueAsNumber: true,
        })}
      >
        <option value={WEEK}>1 week</option>
        <option value={2 * WEEK}>2 weeks</option>
        <option value={3 * WEEK}>3 weeks</option>
        <option value={MONTH}>1 month</option>
        <option value={2 * MONTH}>2 months</option>
      </select>
      <FieldError msg={errors.time?.message} />

      <label htmlFor="videoUrl">Video URL</label>
      <input
        type="text"
        id="videoUrl"
        {...register("videoUrl")}
        placeholder="https://youtu.be/<ID>"
      />
      <FieldError msg={errors.videoUrl?.message} />

      <label htmlFor="website">Website*</label>
      <input
        type="text"
        id="website"
        {...register("website")}
        placeholder="Website"
      />
      <FieldError msg={errors.website?.message} />

      <label htmlFor="description">Description*</label>
      <textarea
        id="description"
        rows={8}
        {...register("description")}
        placeholder="Description"
      />
      <FieldError msg={errors.description?.message} />

      <label htmlFor="thumbnail">Thumbnail*</label>
      <input
        type="file"
        id="thumbnail"
        {...register("thumbnail")}
        placeholder="Thumbnail"
      />
      <FieldError msg={errors.thumbnail?.message} />

      {disabled ? (
        <p>Uploading...</p>
      ) : (
        <Button type="submit" primary label="Submit" disabled={disabled} />
      )}

      <small>* Required fields</small>
    </form>
  )
}
