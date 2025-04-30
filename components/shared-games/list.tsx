import { Game } from "@/app/api/types";
import { SharedGamesItem } from "./item";
import { Search } from "../common/search";
import { useEffect, useState } from "react";
import { SharedGamesSkeleton } from "./skeleton";

interface SharedGamesListProps {
  games: Game[];
  isLoading?: boolean;
  onClick: (game: Game) => void;
}

export function SharedGamesList({ games, isLoading, onClick }: SharedGamesListProps) {
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  const handleSearch = (term: string) => {
    const filtered = term
      ? games.filter((game) => game.name.toLowerCase().includes(term.toLowerCase()))
      : games;

    setFilteredGames(filtered);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold">Shared Games</h2>

        <div className="flex items-center justify-center px-3 py-1 rounded-full bg-primary/10">
          <span className="text-sm font-medium text-primary">{games.length} games</span>
        </div>
      </div>

      <Search onSearch={handleSearch} placeholder="Find games..." className="w-56" />

      {isLoading ? (
        <SharedGamesSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredGames.map((game) => (
            <SharedGamesItem key={game.appid} game={game} onClick={onClick} />
          ))}
        </div>
      )}
    </div>
  );
}
