import { DownloadSimple } from "phosphor-react";

export default function Download() {
  return (
    <a
      href="https://apps.apple.com/in/app/snapchat/id447188370" 
      target="_blank" 
      rel="noreferrer" 
      className="flex items-center shadow-post-shadow px-6 py-4 rounded-2xl gap-x-3 mt-6 mb-6"
    >
      <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
        <h2 className="font-normal">Download the App</h2>
      </div>
      <DownloadSimple size={25} color="#9c9c9c" className="self-center"/>
    </a>
  )
}