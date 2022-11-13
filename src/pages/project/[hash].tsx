import React from "react"
import type { NextPage, NextPageContext } from "next"
import { Layout } from "@layout/Layout"
import { MetaData } from "@components/common/MetaData"

type ProjectProps = {
  hash: string
}

const Project: NextPage<ProjectProps> = ({ hash }) => {
  return (
    <Layout>
      <MetaData />
      <p>{hash}</p>
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
