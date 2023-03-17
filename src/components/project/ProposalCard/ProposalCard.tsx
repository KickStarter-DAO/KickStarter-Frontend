import { ProposalProps, useIPFS } from "src/web3/hooks"
import { Card } from "@components/common/Card"

export type ProposalCardProps = {
  proposal: ProposalProps
}

export const ProposalCard = ({ proposal }: ProposalCardProps) => {
  const { data, status } = useIPFS("proposal", proposal.description)

  return (
    <>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <Card
          title={data.name}
          description={data.description}
          href={`/proposal/${proposal.proposalId}/${proposal.description}`}
          buttonLabel="View Proposal"
        />
      )}
    </>
  )
}
