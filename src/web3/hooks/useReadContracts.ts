import { useContract, useProvider,useContractRead, useSigner } from "wagmi"
import { contractAddress } from "../constants"
import governanceAbi from "../abi/governanceContract.json"
import { ethers } from "ethers"

const useGovernanceContractRead = () => {


  const {data:entryFee}= useContractRead({
    address: contractAddress,
    abi:governanceAbi ,
    functionName: "getEnteranceFee",
  })

  // console.log(entryFee.toString())

  const {data:projectId}= useContractRead({
    address: contractAddress,
    abi:governanceAbi,
    functionName: "getCurrentProjectId",
  })


  

  return {
    entryFee,
    projectId
  }
}

export default useGovernanceContractRead
