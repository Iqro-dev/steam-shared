"use client";

import { Player } from "@/app/api/types";
import { Search } from "./search";
import { useState } from "react";
import { FriendItem } from "./item";

export interface FriendsListProps {
  friends: Player[];
}

export function FriendsList({ friends }: FriendsListProps) {
  const [filteredFriends, setFilteredFriends] = useState<Player[]>(friends);

  const handleSearch = (term: string) => {
    const filtered = term
      ? friends.filter((friend) => friend.personaname.toLowerCase().includes(term.toLowerCase()))
      : friends;
    setFilteredFriends(filtered);
  };

  return (
    <div className="flex flex-col gap-6 w-full ">
      <Search onSearch={handleSearch} />

      <div className="flex flex-col gap-2">
        {filteredFriends.map((friend) => (
          <FriendItem key={friend.steamid} friend={friend} />
        ))}
      </div>
    </div>
  );
}
