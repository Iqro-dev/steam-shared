"use client";

import { Game, Player } from "@/app/api/types";
import { useEffect, useState } from "react";
import { SharedGamesUser } from "./user";
import { SharedGamesList } from "./list";
import { Users } from "lucide-react";
import { Hours } from "./hours";

interface GameComparisonProps {
  currentUser: Player;
  comparedUser: Player | null;
  currentUserGames: Game[];
  comparedUserGames: Game[];
  availableOptions: Player[];
}

export function GameComparison({
  currentUser,
  comparedUser,
  currentUserGames,
  comparedUserGames,
  availableOptions,
}: GameComparisonProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [hours, setHours] = useState<{
    firstPlayerHours: number;
    secondPlayerHours: number;
  }>({
    firstPlayerHours: 0,
    secondPlayerHours: 0,
  });

  const sharedGames = currentUserGames.filter((game) =>
    comparedUserGames.some((comparedGame) => comparedGame.appid === game.appid)
  );

  const handleGameClick = (clickedGame: Game) => {
    if (clickedGame) {
      setHours({
        firstPlayerHours:
          currentUserGames.find((game) => game.appid === clickedGame.appid)?.playtime_forever ?? 0,
        secondPlayerHours:
          comparedUserGames.find((game) => game.appid === clickedGame.appid)?.playtime_forever ?? 0,
      });

      setSelectedGame(clickedGame);
    }
  };

  useEffect(() => {
    setSelectedGame(null);
  }, [currentUser, comparedUser]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-center items-start gap-8 md:gap-12">
        <SharedGamesUser
          currentUserSteamId={currentUser.steamid}
          comparedUserSteamId={comparedUser?.steamid}
          isCurrentUser={true}
          availableOptions={[currentUser, ...availableOptions]}
          selectedUser={currentUser}
        />

        <div className="flex items-center justify-center h-12 w-12 aspect-square rounded-full bg-secondary self-center">
          <Users className="h-6 w-6 text-secondary-foreground" />
        </div>

        <SharedGamesUser
          currentUserSteamId={currentUser.steamid}
          comparedUserSteamId={comparedUser?.steamid}
          isCurrentUser={false}
          availableOptions={availableOptions}
          selectedUser={comparedUser}
        />
      </div>

      {selectedGame && (
        <Hours
          name={selectedGame.name}
          firstPlayerHours={hours.firstPlayerHours}
          secondPlayerHours={hours.secondPlayerHours}
        />
      )}

      <SharedGamesList games={sharedGames} onClick={handleGameClick} />
    </div>
  );
}
