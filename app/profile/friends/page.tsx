import { STEAM_ID_COOKIE } from "@/constants";
import { FriendsList } from "@/components/friends/list";
import { getFriends } from "@/utils/get-friends";
import { cookies } from "next/headers";

export default async function FriendsPage() {
  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;
  const { friends } = await getFriends(steamId);

  return (
    <div className="flex flex-col gap-4 p-5">
      <FriendsList friends={friends} />
    </div>
  );
}
