// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method, body } = req

  if (method === "POST") {
    // Process a POST request
    console.log(body)
  } else {
    // Handle any other HTTP method
  }
  res.status(200).json({ name: "John Doe" })
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
