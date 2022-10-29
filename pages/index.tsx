import type { NextPage } from 'next'
import Head from 'next/head'
import Download from '../components/download'
import logo from '../public/logo.svg'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Meetsy</title>
        <meta name="description" content="Meetsy's Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="Meetsy, Landing Page, Download App, Share Social Media Accounts"></meta>
        <meta name="author" content="Meetsy"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-screen w-screen justify-center items-center fixed mb-20">
        <div className="flex items-center divide-x-2 gap-x-4">
          <Image src={logo} alt="Meetsy Logo" width={40} height={40} />
          <h1 className="pl-4">Welcome to Meetsy</h1>
        </div>
        <Download />
      </main>
    </>
  )
}

export default Home