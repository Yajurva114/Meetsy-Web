interface LinkEdge {
  userId1: string;
  userId2: string;
  timestamp: number;
  location: string;
}

interface AccountEdge {
  platform: string;
  username: string;
}

export type { LinkEdge, AccountEdge };