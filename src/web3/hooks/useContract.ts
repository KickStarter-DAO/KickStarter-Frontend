import { useContract, useProvider, useSigner } from "wagmi"
import { contractAddress } from "../constants"
import governanceAbi from "../abi/governanceContract.json"

const useGovernanceContract = () => {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const contract = useContract({
    address: contractAddress,
    abi: governanceAbi,
    signerOrProvider: signer || provider,
  })


  

  return {
    contract,
  }
}

export default useGovernanceContract
