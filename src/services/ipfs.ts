import * as ipfsClient from "ipfs-http-client";

const auth = "Basic " + Buffer.from(
  `${process.env.INFURA_IFPS_PROJECT_ID}:${process.env.INFURA_IPFS_PROJECT_SECRET}`
).toString("base64");

export const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});