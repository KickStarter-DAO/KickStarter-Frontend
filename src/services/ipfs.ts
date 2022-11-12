import * as ipfsClient from "ipfs-http-client"

const auth =
  "Basic " +
  Buffer.from(
    `${process.env.NEXT_PUBLIC_INFURA_IFPS_PROJECT_ID}:${process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET}`,
  ).toString("base64")

export const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
})
