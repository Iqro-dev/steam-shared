import { getFriendsList } from "@/app/api/fetchers/get-friends-list";
import { getPlayerSummaries } from "@/app/api/fetchers/get-player-summaries";
import { Friend, Player } from "@/app/api/types";
import { STEAM_ID_COOKIE } from "@/app/constants";
import { FriendsList } from "@/components/friends/list";
import { Search } from "@/components/friends/search";
import { cookies } from "next/headers";

export default async function FriendsPage() {
  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;

  let friendsList: Friend[] = [];
  let friends: Player[] = [];

  if (steamId) {
    friendsList = await getFriendsList(steamId);

    friends = await getPlayerSummaries(friendsList.map((friend) => friend.steamid).join(","));
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      <FriendsList friends={friends} />
    </div>
  );
}
