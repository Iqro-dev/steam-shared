import { Game } from "@/app/api/types";

interface SharedGamesListProps {
  games: Game[];
}

export function SharedGamesList({ games }: SharedGamesListProps) {
  return (
    <div>
      {games.map((game) => (
        <div key={game.appid} className="mb-4">
          <h2 className="text-xl font-bold">{game.name}</h2>
        </div>
      ))}
    </div>
  );
}
