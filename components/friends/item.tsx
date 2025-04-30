import { Player } from "@/app/api/types";
import { PlayerAvatar } from "../common/player-avatar";
import { FriendStatus } from "./status";
import { FriendMenu } from "./menu";

export interface FriendItemProps {
  friend: Player;
  currentUserId: string;
}

export function FriendItem({
  friend: { personaname, avatarmedium, personastate, steamid },
  currentUserId,
}: FriendItemProps) {
  return (
    <div className="flex flex-row bg-secondary p-4 hover:bg-muted rounded-md items-center gap-3">
      <PlayerAvatar
        src={avatarmedium}
        fallback={personaname[0]}
        alt={personaname}
        className="w-10 h-10"
      />

      <span className="text-lg truncate max-w-[300px]">{personaname}</span>

      <div className="flex flex-row gap-2 ml-auto">
        <FriendStatus status={personastate} />

        <FriendMenu
          personaname={personaname}
          currentUserId={currentUserId}
          comparedUserId={steamid}
        />
      </div>
    </div>
  );
}
