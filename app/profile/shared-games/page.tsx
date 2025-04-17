import { FRIEND_ID_PARAM, STEAM_ID_COOKIE } from "@/constants";
import { SharedGamesPageProps } from "@/types/page";
import { getSharedGames } from "@/utils/get-shared-games";
import { SharedGamesList } from "@/components/shared-games/list";
import { cookies } from "next/headers";
import { Game } from "@/app/api/types";
import { Card } from "@/components/ui/card";
import { SharedGamesUser } from "@/components/shared-games/user";
import { Arrows } from "@/components/common/arrows";

export default async function SharedGamesPage({ searchParams }: SharedGamesPageProps) {
  const params = await searchParams;
  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;

  let games: Game[] = [];

  const friendId = params[FRIEND_ID_PARAM];

  if (!steamId) return null;

  if (friendId) games = await getSharedGames(steamId, friendId);

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-3xl font-bold mb-4">Shared Games</h1>

      <Card className="flex flex-row w-full bg-secondary justify-center">
        <SharedGamesUser steamId={steamId} />

        <Arrows />

        {friendId && <SharedGamesUser steamId={friendId} />}
      </Card>

      <div className="w-full flex justify-center">
        <SharedGamesList games={games} />
      </div>
    </div>
  );
}
