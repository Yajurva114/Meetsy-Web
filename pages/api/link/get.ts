import type { NextApiRequest, NextApiResponse } from 'next'
import driver from '../../../neo4j';

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

  // create neo4j session
  const session = driver.session();

  try {
    const result = await session.readTransaction(tx =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[link:LINK]-(user:User)
         RETURN link, user`,
        { userId: userId }
      )
    );

    // check if user has not made any links
    if (result.records.length === 0) {
      // 404: Resource Not Found
      res.status(404).end();
      // close session after error
      await session.close();
      return;
    }

    const links = [];
    // create array of link + user objects
    for (let i = 0; i < result.records.length; i++) {
      links.push({
        ... result.records[i].get('link').properties,
        ... result.records[i].get('user').properties
      });
    }
  
    // 200: OK
    res.status(200).json(links);
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