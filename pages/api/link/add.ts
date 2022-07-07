import type { NextApiRequest, NextApiResponse } from 'next'
import session from '../../../neo4j';
import { LinkEdge } from '../../../types/edge'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { API_TOKEN } = req.query;

  if (API_TOKEN !== process.env.API_TOKEN) {
    // 401: Unauthorized
    return res.status(401).end();
  }

  if (req.method !== 'POST') {
    // 405: Method Not Allowed
    return res.status(405).end();
  }

  const link = req.body as LinkEdge;
  console.log(link.timestamp);
  // check if link conforms to schema
  if (!link.userId1 || !link.userId2 || !link.timestamp || !link.location) {
    // 400: Bad Request
    return res.status(400).end();
  }

  try {
    await session.writeTransaction(tx =>
      tx.run(
        `MATCH (u1:User {userId: $userId1})
         MATCH (u2:User {userId: $userId2})
         CREATE (u1)-[:LINK {timestamp: $timestamp, location: $location}]->(u2)
         SET u1.links = u1.links + 1, u2.links = u2.links + 1`,
        { userId1: link.userId1, userId2: link.userId2, timestamp: link.timestamp, location: link.location }
      )
    );

    // 201: Resource Created
    res.status(201).end();
  }
  catch (err) {
    // 500: Internal Server Error
    res.status(500).end();
  }

}
