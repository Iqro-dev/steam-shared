import { Player } from "@/app/api/types";
import { PlayerAvatar } from "../common/player-avatar";
import { FriendStatus } from "./status";
import { FriendMenu } from "./menu";

export interface FriendItemProps {
  friend: Player;
}

export function FriendItem({
  friend: { personaname, avatarmedium, personastate, steamid },
}: FriendItemProps) {
  return (
    <div className="flex flex-row w-full bg-secondary p-4 hover:bg-muted rounded-md items-center gap-3">
      <PlayerAvatar
        src={avatarmedium}
        fallback={personaname[0]}
        alt={personaname}
        classname="w-10 h-10"
      />

      <span className="text-lg">{personaname}</span>

      <div className="flex flex-row gap-2 ml-auto">
        <FriendStatus status={personastate} />

        <FriendMenu personaname={personaname} steamid={steamid} />
      </div>
    </div>
  );
}
