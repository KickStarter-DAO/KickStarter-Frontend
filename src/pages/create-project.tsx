import React, { useState } from "react"
import type { NextPage } from "next"
import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"

const createProject = async (data: any) => {
  const res = await fetch("/api/project", {
    method: "POST",
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })

  return res.json() // parses JSON response into native JavaScript objects
}

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  website: z.string().min(1, { message: "Required" }),
})

// TODO: connect wallet
// TODO: after uploading data, push it to contract
const CreateProject: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const [data, setData] = useState("")

  const { mutate, isLoading } = useMutation(createProject, {
    onSuccess: (data) => {
      console.log(data)
      const message = "success"
      alert(message)
    },
    onError: (err) => {
      alert("there was an error", err)
    },
    onSettled: () => {
      // queryClient.invalidateQueries("create")
    },
  })

  return (
    <Layout>
      <MetaData />
      <form
        className="container mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit((data) => {
          setData(JSON.stringify(data))
          mutate(data)
        })}
      >
        <label htmlFor="name">Project name</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          placeholder="Project name"
        />
        {errors.name?.message && <p>{JSON.stringify(errors.name?.message)}</p>}

        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          {...register("website")}
          placeholder="Website"
        />
        {errors.website?.message && (
          <p>{JSON.stringify(errors.website?.message)}</p>
        )}

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={8}
          {...register("description")}
          placeholder="Description"
        />
        <label htmlFor="images">Images</label>
        <input
          type="file"
          multiple
          {...register("images")}
          placeholder="Images"
        />
        {/* <select {...register("category", { required: true })}>
          <option value="">Select...</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
        </select>
        <textarea {...register("aboutYou")} placeholder="About you" /> */}
        <p>{data}</p>
        <input type="submit" />
      </form>
    </Layout>
  )
}

export default CreateProject

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
