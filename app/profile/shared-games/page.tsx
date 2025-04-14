import { STEAM_ID_COOKIE } from "@/app/constants";
import { FRIEND_ID } from "@/app/constants/search-params";
import { SharedGamesPageProps } from "@/app/types/page";
import { getSharedGames } from "@/app/utils/get-shared-games";
import { SharedGamesList } from "@/components/shared-games/list";
import { cookies } from "next/headers";

export default async function SharedGamesPage({ searchParams }: SharedGamesPageProps) {
  const params = await searchParams;
  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;
  const friendId = params[FRIEND_ID];

  if (!steamId || !friendId) return null;

  const games = await getSharedGames(steamId, friendId);

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-3xl font-bold mb-4">Shared Games</h1>

      <SharedGamesList games={games} />
    </div>
  );
}
