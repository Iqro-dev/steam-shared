import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { FRIEND_ID } from "@/app/constants/search-params";

export interface FriendMenuProps {
  personaname: string;
  steamid: string;
}

export function FriendMenu({ personaname, steamid }: FriendMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>{personaname}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Profile</DropdownMenuItem>

        <DropdownMenuItem>
          <Link href={`/profile/shared-games?${FRIEND_ID}=${steamid}`}>Shared Games</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
