import { STEAM_ID_COOKIE } from "../api/constants/cookies";
import { cookies } from "next/headers";
import { getFriendsList } from "../api/fetchers/get-friends-list";

export default async function Profile() {
  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;

  let friendsList;

  if (steamId) {
    friendsList = await getFriendsList(steamId);
  }

  console.log(friendsList);

  return (
    <div>
      Profile
      <div>Friend list</div>
    </div>
  );
}
