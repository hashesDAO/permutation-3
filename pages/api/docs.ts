import type { NextApiRequest, NextApiResponse } from 'next'
import * as swaggerDocs from '../../swagger.json';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(swaggerDocs)
}
