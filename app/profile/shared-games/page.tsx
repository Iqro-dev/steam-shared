import { FRIEND_ID_PARAM, STEAM_ID_COOKIE } from "@/constants";
import { SharedGamesPageProps } from "@/types/page";
import { cookies } from "next/headers";
import { getFriends } from "@/utils/get-friends";
import { getPlayerSummaries } from "@/app/api/fetchers/get-player-summaries";
import { GameComparison } from "@/components/shared-games/comparison";

export default async function SharedGamesPage({ searchParams }: SharedGamesPageProps) {
  const params = await searchParams;

  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;

  const friendId = params[FRIEND_ID_PARAM];

  if (!steamId) return null;

  const { friends } = await getFriends(steamId);

  const currentUser = await getPlayerSummaries(steamId);

  const selectedUser = await getPlayerSummaries(friendId);

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-3xl font-bold mb-4">Shared Games</h1>

      <GameComparison
        availableOptions={friends}
        initialUser={currentUser[0]}
        selectedUser={selectedUser[0]}
      />
    </div>
  );
}
