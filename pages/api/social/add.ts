import type { NextApiRequest, NextApiResponse } from 'next'
import driver from '../../../neo4j'

type ReqBody = {
  userId: string,
  socials: string[][],
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

  if (req.method !== 'POST') {
    // 405: Method Not Allowed
    return res.status(405).end();
  }

  const body = req.body as ReqBody;
  // check if user conforms to schema
  if (!body.userId || !body.socials || body.socials.length === 0) {
    // 400: Bad Request
    return res.status(400).end();
  }

  // create neo4j session
  const session = driver.session();

  try {
    await session.writeTransaction(tx =>
      tx.run(
        `MATCH (u:User {userId: $userId})
         UNWIND $socials as social
         MATCH (p:Platform {name: social[0]})
         CREATE (u)-[:USES {username: social[1]}]->(p)`,
        { socials: body.socials, userId: body.userId }
      )
    );

    fetch(`/api/revalidate?userId=${body.userId}&API_TOKEN=${process.env.API_TOKEN}`);

    // 201: Resource Created
    res.status(201).end();
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
