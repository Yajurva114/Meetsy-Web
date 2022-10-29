import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col w-screen text-gray-500 gap-y-1 border-t-4 border-gray-100 py-8 px-6 mt-12">
      <h2>©Meetsy 2022 all rights reserved</h2>
      <Link href="/" passHref><h2 className="underline underline-offset-2">Meetsy - Home Page</h2></Link>
      <Link href="/about" passHref><h2 className="underline underline-offset-2">What is Meetsy?</h2></Link>
      <Link href="/" passHref><h2 className="underline underline-offset-2 mt-6">Terms of Service</h2></Link>
      <Link href="/" passHref><h2 className="underline underline-offset-2">Privacy Policy</h2></Link>
    </footer>
  )
}