"use client";

import { Game, Player } from "@/app/api/types";
import { useEffect, useState } from "react";
import { SharedGamesUser } from "./user";
import { getSharedGames } from "@/utils/get-shared-games";
import { SharedGamesList } from "./list";
import { Users } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCurrentUserSelect = (user: Player) => {
    setCurrentUser(user);
  };

  const handleComparedUserSelect = (user: Player) => {
    setComparedUser(user);
  };

  useEffect(() => {
    async function handleCompare() {
      if (!comparedUser) {
        setGames([]);
        return;
      }

      setIsLoading(true);

      try {
        const sharedGames = await getSharedGames(currentUser.steamid, comparedUser.steamid);

        setGames(sharedGames);
      } catch (error) {
        console.error(error);

        setGames([]);
      } finally {
        setIsLoading(false);
      }
    }

    void handleCompare();
  }, [currentUser, comparedUser]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-center items-start gap-8 md:gap-12">
        <SharedGamesUser
          availableOptions={[initialUser, ...availableOptions]}
          selectedUser={currentUser}
          onSelectUser={handleCurrentUserSelect}
        />

        <div className="flex items-center justify-center h-12 w-12 aspect-square rounded-full bg-secondary self-center">
          <Users className="h-6 w-6 text-secondary-foreground" />
        </div>

        <SharedGamesUser
          availableOptions={[initialUser, ...availableOptions]}
          selectedUser={comparedUser}
          onSelectUser={handleComparedUserSelect}
        />
      </div>

      <SharedGamesList games={games} isLoading={isLoading} />
    </div>
  );
}
