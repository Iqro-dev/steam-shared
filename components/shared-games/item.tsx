import { STEAM_API_ICON_URL } from "@/app/api/config";
import { Game } from "@/app/api/types";
import Image from "next/image";

export interface SharedGamesItemProps {
  game: Game;
  onClick: (game: Game) => void;
}

export function SharedGamesItem({ game, onClick }: SharedGamesItemProps) {
  return (
    <div
      key={game.appid}
      className="flex items-center space-x-4 p-4 rounded-xl bg-lime-500/80 hover:bg-lime-500/90 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(game)}
    >
      <div className="p-2 rounded-lg bg-white/30">
        <Image
          src={`${STEAM_API_ICON_URL}/${game.appid}/${game.img_icon_url}.jpg`}
          alt={game.name}
          width={24}
          height={24}
          className="rounded-md"
        />
      </div>

      <span className="text-white text-lg font-medium">{game.name}</span>
    </div>
  );
}
