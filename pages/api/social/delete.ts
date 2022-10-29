import type { NextApiRequest, NextApiResponse } from 'next'
import driver from '../../../neo4j'

type DeleteObj = {
  userId: string,
  platform: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { API_TOKEN } = req.query;

  if (API_TOKEN !== process.env.API_TOKEN) {
    // 401: Unauthorized
    return res.status(401).end();
  }

  if (req.method !== 'DELETE') {
    // 405: Method Not Allowed
    return res.status(405).end();
  }

  const deleteObj = req.body as DeleteObj;
  // check if update conforms to schema
  if (!deleteObj.userId || !deleteObj.platform) {
    // 400: Bad Request
    return res.status(400).end();
  }

  // create neo4j session
  const session = driver.session();

  try {
    await session.writeTransaction(tx =>
      tx.run(
        `MATCH (:User {userId: $userId})-[r:USES]->(:Platform {name: $name})
         DELETE r`,
        { userId: deleteObj.userId, name: deleteObj.platform }
      )
    );

    // 204: No Content Returned
    res.status(204).end();
    // close session after transaction
    await session.close();
  }
  catch (err) {
    // 500: Internal Server Error
    res.status(500).end();
    // close session after error
    await session.close();
  }

}
