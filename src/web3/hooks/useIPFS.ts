import { useQuery } from "react-query"

const IPFS_BASE_URL = "https://ipfs.io/ipfs/"

export function useIPFS(queryId: string, hash: string) {
  return useQuery(queryId, async () => {
    const res = await fetch(`${IPFS_BASE_URL}${hash}`)
    return res.json()
  })
}
