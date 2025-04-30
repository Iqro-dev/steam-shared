"use client";

import { Player } from "@/app/api/types";
import { Search } from "../common/search";
import { useState } from "react";
import { FriendItem } from "./item";

export interface FriendsListProps {
  friends: Player[];
  currentUserId: string;
}

export function FriendsList({ friends, currentUserId }: FriendsListProps) {
  const [filteredFriends, setFilteredFriends] = useState<Player[]>(friends);

  const handleSearch = (term: string) => {
    const filtered = term
      ? friends.filter((friend) => friend.personaname.toLowerCase().includes(term.toLowerCase()))
      : friends;
    setFilteredFriends(filtered);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Search onSearch={handleSearch} placeholder="Search friends..." className="w-56" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredFriends
          .sort((a, b) => a.personaname.localeCompare(b.personaname))
          .map((friend) => (
            <FriendItem key={friend.steamid} friend={friend} currentUserId={currentUserId} />
          ))}
      </div>
    </div>
  );
}
