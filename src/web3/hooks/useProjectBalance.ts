import { useState, useEffect } from "react"
import { BigNumber } from "ethers"
import { useGovernanceContract } from "src/web3/hooks"

export function useProjectBalance(projectId: string) {
  const governanceContract = useGovernanceContract()

  const [balance, setBalance] = useState<BigNumber | null>(null)

  useEffect(() => {
    governanceContract?._getBalanceOfProject(projectId).then(setBalance)
  }, [governanceContract, projectId])

  return balance
}
