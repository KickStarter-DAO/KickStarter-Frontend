import React from "react"
import type { NextPage, NextPageContext } from "next"
import { useQuery } from "react-query"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"

const IPFS_BASE_URL = "https://ipfs.io/ipfs/"

type ProjectProps = {
  hash: string
}

const Project: NextPage<ProjectProps> = ({ hash }) => {
  const { data, status } = useQuery("project", async () => {
    const res = await fetch(`${IPFS_BASE_URL}${hash}`)
    return res.json()
  })

  console.log(data, status)

  return (
    <Layout>
      <MetaData />
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div className="container mx-auto">
          <div className="flex">
            <img
              src={data.image.replace("ipfs://", IPFS_BASE_URL)}
              alt="cover"
              className="w-2/3"
            />
            <div className="w-1/3"></div>
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
  const hash = context.query?.hash

  console.log({ hash })

  if (hash == null) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  return {
    props: {
      hash,
    },
  }
}
