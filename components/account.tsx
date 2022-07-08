import { InstagramLogo, LinkedinLogo, SnapchatLogo } from 'phosphor-react';
import { AccountEdge } from '../types/edge';

type Props = {
  account: AccountEdge
}

export default function Account({ account }: Props) {
  switch (account.platform) {
    case 'Instagram':
      return (
        <a
          className="flex items-center w-full shadow-post-shadow p-6 rounded-2xl gap-x-3 mt-6"
          href={`https://www.instagram.com/${account.username}`}
          target="_blank"
          rel="noreferrer"
        >
          <InstagramLogo size={35} />
          <h2 className="font-normal">Instagram</h2>
        </a>
      )

    case 'Snapchat':
      return (
        <a
          className="flex items-center w-full shadow-post-shadow p-6 rounded-2xl gap-x-3 mt-6" 
          href={`https://www.snapchat.com/add/${account.username}`}
          target="_blank"
          rel="noreferrer"
        >
          <SnapchatLogo size={35} />
          <h2 className="font-normal">Snapchat</h2>
        </a>
      )

    case 'Linkedin':
      return (
        <a
          className="flex items-center w-full shadow-post-shadow p-6 rounded-2xl gap-x-3 mt-6" 
          href={`https://www.linkedin.com/in/${account.username}`}
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinLogo size={35} />
          <h2 className="font-normal">Linkedin</h2>
        </a>
      )
    
    default:
      return <></>
  }
}