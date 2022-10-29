This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and written in Typescript.

# Meetsy

Meetsy is a social networking platform enabling users to share their internet presence instantly. The website offers dynamic endpoints enabling Meetsy's functionality. Every user has his/her unique link address given by https://link-topaz.vercel.app/{_id} where the _id is a unique parameter determined by MongoDB (stored as a object of class ObjectId in the database).

### Architecture:

We have opted for a full stack framework (Nextjs) offering support for both our limited frontend and API. The website will be hosted on a dynamic IP Address. It will be connected to a NoSQL database - MongoDB, running on MongoDB Atlas, a cloud service.

### Deployed on Vercel

Meetsy is currently hosted on a hobby account, free of charge.

## Meetsy's API

Our API acts as a middleman for both our fontend and IOS App by communicating directly with the MongoDB database.

### Endpoints:

All endpoints are protected by an api token, stored as a environment variable. Every request must contain the token for authorization. Some requests also require a user id and a body.

- https://link-topaz.vercel.app/api/{_id} : Read and write access to all the users in the MongoDB database.
  - Methods: GET, POST, and PATCH.
- https://link-topaz.vercel.app/api/revalidate : Generates static profile pages on demand.

#### https://link-topaz.vercel.app/api/{_id}?secret={API_TOKEN}

- GET Method: Requires user id and returns a user object.
- POST Method: Requires a user object in the body and returns a user id.
- PATCH Method: Requires a user id and an updates object in the body

#### https://link-topaz.vercel.app/api/revalidate?secret={API_TOKEN}&userId={ObjectId}

- Any Method: Requires user id and returns a JSON obj (success / failure)
