import { useContract, useProvider, useSigner } from "wagmi"
import { GOVERNANCE_CONTRACT_ADDRESS } from "../constants"
import governanceAbi from "../abi/governanceContract.json"


export const useGovernanceContract = () => {
  const provider = useProvider()
  const { data: signer } = useSigner()

  return useContract({
    address: GOVERNANCE_CONTRACT_ADDRESS,
    abi: governanceAbi,
    signerOrProvider: signer || provider,
  })


  // const submitFee = async(amount:BigNumber, callback:any) =>{
  //  await contract?.paySubmitFee(amount).then(callback)
  // }
  
}
