export interface Friend {
  steamid: string;
  relationship: string;
  friend_since: number;
}

export interface FriendsListResponse {
  friendslist: {
    friends: Friend[];
  };
}
