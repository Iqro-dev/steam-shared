"use client";

import { Game, Player } from "@/app/api/types";
import { useEffect, useState } from "react";
import { SharedGamesUser } from "./user";
import { getSharedGames } from "@/utils/get-shared-games";
import { SharedGamesList } from "./list";
import { Users } from "lucide-react";
import { Hours } from "./hours";

interface GameComparisonProps {
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
  const [comparedGame, setComparedGame] = useState<string>("");
  const [games, setGames] = useState<{
    sharedGames: Game[];
    firstPlayerGames: Game[];
    secondPlayerGames: Game[];
  }>({
    sharedGames: [],
    firstPlayerGames: [],
    secondPlayerGames: [],
  });
  const [hours, setHours] = useState<{
    firstPlayerHours: number;
    secondPlayerHours: number;
  }>({
    firstPlayerHours: 0,
    secondPlayerHours: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCurrentUserSelect = (user: Player) => {
    setCurrentUser(user);
  };

  const handleComparedUserSelect = (user: Player) => {
    setComparedUser(user);
  };

  useEffect(() => {
    async function handleCompare() {
      if (!comparedUser) {
        setGames({ sharedGames: [], firstPlayerGames: [], secondPlayerGames: [] });

        return;
      }

      setIsLoading(true);

      try {
        const result = await getSharedGames(currentUser.steamid, comparedUser.steamid);

        setGames(result);
      } catch (error) {
        console.error(error);

        setGames({ sharedGames: [], firstPlayerGames: [], secondPlayerGames: [] });
      } finally {
        setIsLoading(false);
      }
    }

    setComparedGame("");

    void handleCompare();
  }, [currentUser, comparedUser]);

  const handleGameClick = (game: Game) => {
    const firstPlayerHours =
      games.firstPlayerGames.find((g) => g.appid === game.appid)?.playtime_forever ?? 0;

    const secondPlayerHours =
      games.secondPlayerGames.find((g) => g.appid === game.appid)?.playtime_forever ?? 0;

    if (game) {
      setHours({
        firstPlayerHours,
        secondPlayerHours,
      });

      setComparedGame(game.name);
    }
  };

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

      {comparedGame && (
        <Hours
          name={comparedGame}
          firstPlayerHours={hours.firstPlayerHours}
          secondPlayerHours={hours.secondPlayerHours}
        />
      )}

      <SharedGamesList games={games.sharedGames} isLoading={isLoading} onClick={handleGameClick} />
    </div>
  );
}
