import { STEAM_ID_COOKIE } from "../api/constants/cookies";
import { cookies } from "next/headers";
import { getFriendsList } from "../api/fetchers/get-friends-list";
import { getPlayerSummaries } from "../api/fetchers/get-player-summaries";
import { Game, Player } from "../api/types";
import { getOwnedGames } from "../api/fetchers/get-owned-games";

export default async function Profile() {
  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;
  let steamIds = "";

  let friendsList;
  let playerSummaries: Player[] = [];
  let ownedGames: Game[] = [];

  if (steamId) {
    friendsList = await getFriendsList(steamId);
    steamIds = friendsList.map((friend) => friend.steamid).join(",");
    playerSummaries = await getPlayerSummaries(steamIds);
    playerSummaries.sort((a, b) => a.personaname.localeCompare(b.personaname));
    ownedGames = await getOwnedGames(steamId, true, true);
    ownedGames.sort((a, b) => b.playtime_forever - a.playtime_forever);
  }

  return (
    <div>
      {playerSummaries.map(({ personaname, steamid }) => (
        <div key={steamid}>{personaname}</div>
      ))}

      {ownedGames.map((game) => (
        <div key={game.appid}>
          <div>{game.name}</div>
          <div>{game.playtime_forever / 60}</div>
        </div>
      ))}
    </div>
  );
}
