import type { NextApiRequest, NextApiResponse } from 'next'
import session from '../../../neo4j';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { userId, API_TOKEN } = req.query;
  
  if (API_TOKEN !== process.env.API_TOKEN) {
    // 401: Unauthorized
    return res.status(401).end();
  }

  if (req.method !== 'GET') {
    // 405: Method Not Allowed
    return res.status(405).end();
  }

  if (!userId) {
    // 400: Bad Request
    return res.status(400).end();
  }

  try {
    const result = await session.readTransaction(tx =>
      tx.run(
        `MATCH (:User {userId: $userId})-[account:USES]->(p:Platform)
         RETURN account, p`,
        { userId: userId }
      )
    );

    // more than one record impossible due to userId constraint
    // therefore only check if user requested does not exist
    if (result.records.length === 0) {
      // 404: Resource Not Found
      return res.status(404).end();
    }
  
    // 200: OK
    res.status(200).json(result.records[0].get('u').properties);
  }
  catch (err) {
    // 500: Internal Server Error
    res.status(500).end();
  }

}