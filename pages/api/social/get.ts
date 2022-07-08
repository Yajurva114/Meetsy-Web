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

    // check if user has not made any accounts
    if (result.records.length === 0) {
      // 404: Resource Not Found
      return res.status(404).end();
    }

    const socials = [];
    // create array of account + platform objects
    for (let i = 0; i < result.records.length; i++) {
      socials.push({
        ... result.records[i].get('account').properties,
        platformName: result.records[i].get('p').properties.name
      });
    }
  
    // 200: OK
    res.status(200).json(socials);
  }
  catch (err) {
    // 500: Internal Server Error
    res.status(500).end();
  }

}