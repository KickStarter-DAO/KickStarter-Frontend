import React, { useState } from "react"
import type { NextPage } from "next"
import { useForm } from "react-hook-form"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"

const CreateProject: NextPage = () => {
  const { register, handleSubmit } = useForm()
  const [data, setData] = useState("")

  return (
    <Layout>
      <MetaData />
      <form
        className="container mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
      >
        <label htmlFor="name">Project name</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          placeholder="Project name"
        />
        <label htmlFor="website">Website</label>
        <input type="text" {...register("website")} placeholder="Website" />
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
//   fundRaisingGoalAmount: "",
//   roadMap: "",
//   otherSources: "",
//   projectID: "",
// };
