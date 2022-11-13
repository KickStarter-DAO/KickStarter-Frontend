import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { Address } from "wagmi"
import { ipfs } from "@services/ipfs"
import { Button } from "@components/common/Button"
import { FieldError } from "@components/common/FieldError"
import useGovernanceContract from "src/web3/hooks/useContract"
import toast, {Toaster} from "react-hot-toast"

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

const schema = z.object({
  address: z.string().min(16, { message: "You are not logged in!" }),
  name: z.string().min(1, { message: "Name is required" }),
  website: z.string().min(1, { message: "Website is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required.")
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
}

// TODO: after uploading data, push it to contract
// TODO: use WYSIWYG.
export function CreateProjectForm({ address }: CreateProjectFormProps) {
  // const { contract } = useGovernanceContract()

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
      const { image, ...rest } = data
      // Upload image to IPFS to get CID hash back.
      const imageCID = await ipfs.add(image[0])
      // Attach image CID to the rest of the form's data
      // and upload it to IPFS getting a CID hash back.
      const obj = { ...rest }
      obj["image"] = `ipfs://${imageCID.path}`
      const json = JSON.stringify(obj, null, 2)
      const jsonCID = await ipfs.add(json)
      toast.success(`Upload to IPFS success, ${jsonCID.path}`)
    } catch (err: any) {
      toast.error(`Something went wrong, ${JSON.stringify(err)}`)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <>
    <Toaster/>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleUpload)}>
      <input
        type="hidden"
        id="address"
        {...register("address")}
        value={address}
      />
      <FieldError msg={errors.address?.message} />

      <label htmlFor="name">Project name*</label>
      <input
        type="text"
        id="name"
        {...register("name")}
        placeholder="Project name"
      />
      <FieldError msg={errors.name?.message} />

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

      <label htmlFor="image">Image*</label>
      <input
        type="file"
        id="image"
        {...register("image")}
        placeholder="Image"
      />
      <FieldError msg={errors.image?.message} />

      {disabled ? (
        <p>Uploading...</p>
      ) : (
        <Button type="submit" primary label="Submit" disabled={disabled} />
      )}

      <small>* Required fields</small>
    </form>
    </>
  )
}

// const projectDataTemplate = {
//   projectName: "",
//   website: "",
//   description: "",
//   images1: "",
//   images2: "",
//   images3: "",
//   images4: "",
//   images5: "",
//   video: "",
//   fundRaisingGoalAmount: "", // fundingTarget
//   roadMap: "",
//   otherSources: "",
//   projectID: "",
// };
