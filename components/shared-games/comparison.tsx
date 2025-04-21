"use client";

import { Game, Player } from "@/app/api/types";
import { useEffect, useState } from "react";
import { SharedGamesUser } from "./user";
import { getSharedGames } from "@/utils/get-shared-games";
import { SharedGamesList } from "./list";

export interface GameComparisonProps {
  initialUser: Player;
  selectedUser: Player | null;
  availableOptions: Player[];
}

export function GameComparison({
  initialUser,
  availableOptions,
  selectedUser,
}: GameComparisonProps) {
  const [currentUser, setCurrentUser] = useState<Player>(initialUser);
  const [comparedUser, setComparedUser] = useState<Player | null>(selectedUser);
  const [games, setGames] = useState<Game[]>([]);

  const handleCurrentUserSelect = (user: Player) => {
    setCurrentUser(user);
  };

  const handleComparedUserSelect = (user: Player) => {
    setComparedUser(user);
  };

  useEffect(() => {
    if (!comparedUser) return;

    async function handleCompare() {
      if (!comparedUser) return;

      const sharedGames = await getSharedGames(currentUser.steamid, comparedUser.steamid);

      setGames(sharedGames);
    }

    handleCompare();
  }, [currentUser, comparedUser]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <SharedGamesUser
          availableOptions={[initialUser, ...availableOptions]}
          selectedUser={currentUser}
          onSelectUser={handleCurrentUserSelect}
        />

        <SharedGamesUser
          availableOptions={[initialUser, ...availableOptions]}
          selectedUser={comparedUser}
          onSelectUser={handleComparedUserSelect}
        />
      </div>

      {games.length > 0 ? (
        <SharedGamesList games={games} />
      ) : (
        <span>Something went wrong while retrieving shared games.</span>
      )}
    </div>
  );
}
