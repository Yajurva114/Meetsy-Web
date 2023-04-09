import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  
  const { userId, API_TOKEN } = req.query;
  
  if (API_TOKEN !== process.env.API_TOKEN) {
    // 401: Unauthorized
    return res.status(401).end();
  }
  
  try {
    await res.revalidate(`/${userId}`);
    // 200: OK
    return res.status(200).end();
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    // 500: Internal Server Error
    return res.status(500).end();
  }
}