import { ethers } from "ethers"

const RPC_URL = "https://polygon-mumbai.g.alchemy.com/v2/"

export const provider = new ethers.providers.JsonRpcProvider(
  RPC_URL + process.env.NEXT_PUBLIC_ALCHEMY_KEY,
)
