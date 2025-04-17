import { getPlayerSummaries } from "@/app/api/fetchers/get-player-summaries";
import Image from "next/image";

export interface SharedGamesUserProps {
  steamId: string;
}

export async function SharedGamesUser({ steamId }: SharedGamesUserProps) {
  const user = (await getPlayerSummaries(steamId))?.[0];

  return (
    <div className="flex flex-col gap-2 items-center w-[250px]">
      <Image
        src={user.avatarfull}
        alt="Avatar"
        width={128}
        height={128}
        className="flex border border-black border-5"
      />

      <div className="flex flex-col justify-center">
        <span className="text-lg font-bold line-clamp-1 text-center">{user.personaname}</span>
      </div>
    </div>
  );
}
