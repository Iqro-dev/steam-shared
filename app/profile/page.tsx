import { STEAM_ID_COOKIE } from "../api/constants/cookies";
import { cookies } from "next/headers";
import { getFriendsList } from "../api/fetchers/get-friends-list";
import { getPlayerSummaries } from "../api/fetchers/get-player-summaries";
import { Player } from "../api/types/player";

export default async function Profile() {
  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;
  let steamIds = "";

  let friendsList;
  let playerSummaries: Player[] = [];

  if (steamId) {
    friendsList = await getFriendsList(steamId);
    steamIds = friendsList.map((friend) => friend.steamid).join(",");
    playerSummaries = await getPlayerSummaries(steamIds);
  }

  return (
    <div>
      {playerSummaries.map(({ personaname, steamid }) => (
        <div key={steamid}>{personaname}</div>
      ))}
    </div>
  );
}
