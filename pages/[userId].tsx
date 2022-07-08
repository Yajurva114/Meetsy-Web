import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Account from '../components/account';
import Header from '../components/header';
import Footer from '../components/footer';
import Error from '../components/error';
import Shelf from '../components/shelf';
import { UserNode } from '../types/node';
import { AccountEdge } from '../types/edge';
import session from '../neo4j'

type Props = {
  user: UserNode | null;
  socials: AccountEdge[];
}

/**
 * Renders one account for a user.
 * @param account - The account to be rendered
 * @returns {JSX.Element}
 */
function getAccount(account: AccountEdge): JSX.Element {
  return <Account account={account} key={account.platform}/>;
}

/**
 * Renders a user's profile page.
 * @param {Props} props - The props passed to the component.
 * @returns {JSX.Element}
 */
export default function UserProfile({ user, socials }: Props) {
  // error handling
  if (!user) {
    return <Error statusCode={404} message="User not found"/>;
  }

  // destructuring user
  const { name, links, userId } = user;
  const avatarLink = `https://source.boringavatars.com/pixel/80/${userId}?colors=3B82F6,06B6D4,1D4ED8,DAF517,14B8A6`;

  const renderSocials = () => {
    if (socials.length === 0) {
      return <h3 className="font-normal text-gray-500 mt-10 text-center">{name} has not linked any socials yet</h3>;
    }
    return (
      <>
        <h3 className="font-normal text-gray-500 mt-10">{name}&apos;s Accounts:</h3>
        {socials.map(getAccount)}
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Link | Profile</title>
        <meta name="description" content="A Link User Profile Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="Link, User Profile, QR Code, Social Media Accounts"></meta>
        <meta name="author" content="Link"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-full fixed">
        <div className="overflow-y-auto">
          <Header />

          <main className="flex flex-col px-6 mt-8">
            <div className="flex items-center">
              <img src={avatarLink} width="80" height="80" alt="Avatar" className="rounded-full"></img>
              <div className="flex flex-col ml-4 gap-y-1">
                <h1>{name}</h1>
                <h2>{links} <span className="text-gray-500">Links</span></h2>
              </div>
            </div>

            {renderSocials()}
          </main>

          <Footer />
        </div>
        <Shelf />
      </div>
    </>
  )
}

/**
 * Generates static paths on build time or on demand
 * @returns {Promise}
 */
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

/**
 * Fetches user data from Neo4j during revalidation or a request
 * @returns {Promise}
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // get userId from request params
  const userId = params?.userId;
  
  if (!userId) {
    // invalid userId
    return { props: { user: null, socials: [] } };
  }

  try {
    const result = await session.readTransaction(tx =>
      tx.run(
        `MATCH (u:User {userId: $userId})
         OPTIONAL MATCH (u)-[account:USES]->(p:Platform)
         RETURN u, account, p`,
        { userId: userId }
      )
    );

    // more than one record impossible due to userId constraint
    // therefore only check if user requested does not exist
    if (result.records.length === 0) {
      // user not found
      return { props: { user: null, socials: [] } };
    }

    const socials = [];
    // create array of account + platform objects
    for (let i = 0; i < result.records.length; i++) {
      // only true when user exists but has no socials linked yet
      if (result.records[i].get('account') !== null) {
        socials.push({
          username: result.records[i].get('account').properties.username,
          platform: result.records[i].get('p').properties.name
        });
      } else { break; }
    }
  
    return {
      props: {
        user: result.records[0].get('u').properties as UserNode,
        socials: socials
      }
    }
  }
  catch (err) {
    // 500: Internal Server Error
    return { props: { user: null, socials: [] } };
  }
}