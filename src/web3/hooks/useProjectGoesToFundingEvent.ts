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

export type ProjectProps = {
  projectId: string
}

export const useProjectGoesToFundingEvent = () => {
  const [events, setEvents] = useState<ProjectProps[]>([])

  useEffect(() => {
    contract.queryFilter("projectGoesToFunding").then((events: Event[]) => {
      console.log(events)
      const evts = events
        .sort((a, b) => a.blockNumber - b.blockNumber)
        .map(({ args }) => ({
          projectId: (args?.[0] as BigNumber).toString(),
          // hash: args?.[8] as string,
        }))
        .filter((evt) => evt.projectId != null)

      setEvents(evts)
    })
  }, [])

  return events[events.length - 1]
}
