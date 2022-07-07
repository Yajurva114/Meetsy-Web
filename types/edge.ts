import type { PlatformNode, UserNode } from './node';

interface LinkEdge {
  user1: UserNode;
  user2: UserNode;
  timestamp: number;
  // tentative property
  location: string | null;
}

interface AccountEdge {
  user: UserNode;
  platform: PlatformNode;
  username: string;
}

export type { LinkEdge, AccountEdge };