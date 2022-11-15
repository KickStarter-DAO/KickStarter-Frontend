import { useContract, useProvider, useSigner } from "wagmi"
import { contractAddress } from "../constants"
import governanceAbi from "../abi/governanceContract.json"
import { BigNumber, ethers } from "ethers"


const useGovernanceContract = () => {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const contract = useContract({
    address: contractAddress,
    abi: governanceAbi,
    signerOrProvider: signer || provider,
  })

// const submitFee = async(amount:BigNumber, callback:any) =>{
//  await contract?.paySubmitFee(amount).then(callback)
// }
  

  return {
    contract
  }
}

export default useGovernanceContract
