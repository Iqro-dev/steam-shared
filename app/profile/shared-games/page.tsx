import { COMPARED_ID_PARAM, CURRENT_ID_PARAM, STEAM_ID_COOKIE } from "@/constants";
import { SharedGamesPageProps } from "@/types/page";
import { cookies } from "next/headers";
import { getFriends } from "@/utils/get-friends";
import { getPlayerSummaries } from "@/app/api/fetchers/get-player-summaries";
import { GameComparison } from "@/components/shared-games/comparison";
import { getOwnedGames } from "@/app/api/fetchers/get-owned-games";

export default async function SharedGamesPage({ searchParams }: SharedGamesPageProps) {
  const params = await searchParams;

  const currentUserId = params[CURRENT_ID_PARAM] ?? (await cookies()).get(STEAM_ID_COOKIE)?.value;

  const comparedUserId = params[COMPARED_ID_PARAM];

  if (!currentUserId) return null;

  const { friends } = await getFriends(currentUserId);

  const [currentUser, comparedUser, currentUserGames, comparedUserGames] = await Promise.all([
    getPlayerSummaries(currentUserId),
    comparedUserId ? getPlayerSummaries(comparedUserId) : Promise.resolve([]),
    getOwnedGames(currentUserId, true, true),
    comparedUserId ? getOwnedGames(comparedUserId, true, true) : Promise.resolve([]),
  ]);

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-3xl font-bold mb-4">Shared Games</h1>

      <GameComparison
        availableOptions={friends}
        currentUser={currentUser[0]}
        comparedUser={comparedUser[0]}
        currentUserGames={currentUserGames}
        comparedUserGames={comparedUserGames}
      />
    </div>
  );
}
