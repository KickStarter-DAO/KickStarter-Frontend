import { useState, useEffect } from "react"
import { BigNumber } from "ethers"
import { useGovernanceContract } from "src/web3/hooks"

export function useProjectTimeLeft(projectId: string) {
  const governanceContract = useGovernanceContract()

  const [timeLeft, setTimeLeft] = useState<[BigNumber, BigNumber] | null>(null)

  useEffect(() => {
    governanceContract?.getTimeleft(projectId).then(setTimeLeft)
  }, [governanceContract, projectId])

  return timeLeft
}
