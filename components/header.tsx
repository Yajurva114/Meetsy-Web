import Image from "next/image"
import logo from "../public/logo.svg"

export default function Header() {
  return (
    <header className="flex items-center w-screen justify-between border-b-4 border-gray-100 py-4 px-6">
      <div className="flex items-center gap-x-1">
        <Image src={logo} alt="Link Logo" width={35} height={35} />
        <h1>Meetsy</h1>
      </div>
      <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full">
        <a href="https://apps.apple.com/in/app/snapchat/id447188370" target="_blank" rel="noreferrer">
          <h3 className="text-white font-normal">Get App</h3>
        </a>
      </button>
    </header>
  )
}