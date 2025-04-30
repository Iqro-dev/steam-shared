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
import { COMPARED_ID_PARAM, CURRENT_ID_PARAM } from "@/constants";

export interface FriendMenuProps {
  personaname: string;
  currentUserId: string;
  comparedUserId: string;
}

export function FriendMenu({ personaname, comparedUserId, currentUserId }: FriendMenuProps) {
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
          <Link
            href={`/profile/shared-games?${CURRENT_ID_PARAM}=${currentUserId}&${COMPARED_ID_PARAM}=${comparedUserId}`}
          >
            Shared Games
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
