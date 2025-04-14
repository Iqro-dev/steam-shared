import { getFriendsList } from "@/app/api/fetchers/get-friends-list";
import { getPlayerSummaries } from "@/app/api/fetchers/get-player-summaries";
import { Friend, Player } from "@/app/api/types";

export async function getFriends(steamId: string | undefined) {
  let friendsList: Friend[] = [];
  let friends: Player[] = [];

  if (steamId) {
    friendsList = await getFriendsList(steamId);
    friends = await getPlayerSummaries(friendsList.map((friend) => friend.steamid).join(","));
  }

  return { friends, friendsList };
}
