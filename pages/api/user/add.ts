import type { NextApiRequest, NextApiResponse } from 'next'
import driver from '../../../neo4j'
import { UserNode } from '../../../types/node';

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

  const user = req.body as UserNode;
  // check if user conforms to schema
  if (!user.userId || !user.name) {
    // 400: Bad Request
    return res.status(400).end();
  }

  // create neo4j session
  const session = driver.session();

  try {
    await session.writeTransaction(tx =>
      tx.run(
        'CREATE (:User {userId: $userId, name: $name, links: 0.0})',
        { name: user.name, userId: user.userId }
      )
    );

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
