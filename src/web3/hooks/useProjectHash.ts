import { useState, useEffect } from "react"
import { useGovernanceContract } from "src/web3/hooks"

export function useProjectHash(projectId: string) {
  const governanceContract = useGovernanceContract()

  const [hash, setHash] = useState<string | null>(null)

  useEffect(() => {
    governanceContract?._getHashOfProjectData(projectId).then(setHash)
  }, [governanceContract, projectId])

  return hash
}
