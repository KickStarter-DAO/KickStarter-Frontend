// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { ipfs } from "@services/ipfs"

type Data = {
  hash: string
}

export default async function handler(
  req: NextApiRequest,
  // res: NextApiResponse<Data>,
  res: NextApiResponse<any>,
) {
  // const { method, body: { image, ...rest } } = req
  const { method, body } = req

 console.log(body);
  
  if (method === "POST") {
  // Upload image to IPFS to get CID hash back.
  // const imgCID = await ipfs.add(image);

  // Attach ipfsImg CID to the rest of the body's data
  // and upload it to IPFS getting a CID hash back.
  // const obj = { ...rest };
  // obj["image"] = `ipfs://${imgCID.path}`;
  // const json = JSON.stringify(obj, null, 2);
  // console.log(json)
  // const jsonCID = await ipfs.add(json);
  // res.status(200).json({ hash: jsonCID })
  } else {
    // Handle any other HTTP method
  }
  res.status(200).json({ hash: "" })
}

// import type { NextApiRequest, NextApiResponse } from 'next'

// export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
//   const {
//     query: { id, name },
//     method,
//   } = req

//   switch (method) {
//     case 'GET':
//       // Get data from your database
//       res.status(200).json({ id, name: `User ${id}` })
//       break
//     case 'PUT':
//       // Update or create data in your database
//       res.status(200).json({ id, name: name || `User ${id}` })
//       break
//     default:
//       res.setHeader('Allow', ['GET', 'PUT'])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
// }
