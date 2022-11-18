import { useEffect, useState } from "react"
import { ethers, BigNumber, Event } from "ethers"
import { GOVERNANCE_CONTRACT_ADDRESS } from "../constants"
import governanceAbi from "../abi/governanceContract.json"
import { provider } from "../provider"

const contract = new ethers.Contract(
  GOVERNANCE_CONTRACT_ADDRESS,
  governanceAbi,
  provider,
)

export type ProposalProps = {
  proposalId: string
  description: string
}

export const useGovernanceContractEvent = () => {
  const [events, setEvents] = useState<ProposalProps[]>([])

  useEffect(() => {
    contract.queryFilter("ProposalCreated").then((events: Event[]) => {
      console.log(events)
      const evts = events
        .sort((a, b) => a.blockNumber - b.blockNumber)
        .map(({ args }) => ({
          proposalId: (args?.[0] as BigNumber).toString(),
          description: args?.[8] as string,
        }))
        .filter((evt) => evt.proposalId != null && evt.description != null)

      setEvents(evts)
    })
  }, [])

  return events[events.length - 1]
}
