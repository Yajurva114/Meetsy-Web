import type { NextApiRequest, NextApiResponse } from 'next'
import session from '../../../neo4j'
import { UserNode } from '../../../types/node'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserNode>
) {

  const { username, API_TOKEN } = req.query;
  
  if (API_TOKEN !== process.env.API_TOKEN) {
    // 401: Unauthorized
    return res.status(401).end();
  }

  if (!username) {
    // 400: Bad Request
    return res.status(400).end();
  }

  const result = await session.readTransaction(tx =>
    tx.run(
      'MATCH (u:User {username: $username}) RETURN u',
      { username: username }
    )
  );

  if (result.records.length === 0) {
    // 404: Not Found
    return res.status(404).end();
  }

  // 200: OK
  res.status(200).json(result.records[0].get('u').properties as UserNode);

}
