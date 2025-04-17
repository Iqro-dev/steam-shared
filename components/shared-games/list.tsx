import { Game } from "@/app/api/types";
import { SharedGamesItem } from "./item";

interface SharedGamesListProps {
  games: Game[];
}

export function SharedGamesList({ games }: SharedGamesListProps) {
  return (
    <ul className="space-y-3">
      {games.map((game) => (
        <SharedGamesItem key={game.appid} game={game} />
      ))}
    </ul>
  );
}
