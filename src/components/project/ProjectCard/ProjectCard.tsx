import { useIPFS } from "src/web3/hooks"
import { Card } from "@components/common/Card"

export type ProjectCardProps = {
  projectId: string
  hash: string
}

export const ProjectCard = ({ projectId, hash }: ProjectCardProps) => {
  const { data, status } = useIPFS("project", hash)

  return (
    <>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <Card
          title={data.name}
          description={data.description}
          href={`/project/${projectId}/${hash}`}
          buttonLabel="View Project"
        />
      )}
    </>
  )
}
