"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Player } from "@/app/api/types";
import Image from "next/image";
import { useSteamIdCookie } from "@/app/hooks/use-steam-id-cookie";
import { redirect } from "next/navigation";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { PlayerAvatar } from "../common/player-avatar";

export interface PlayerDropdownProps {
  currentPlayer: Player;
}
export function PlayerDropdown({
  currentPlayer: { avatarmedium, personaname },
}: PlayerDropdownProps) {
  const { removeSteamIdCookie } = useSteamIdCookie();

  function logout() {
    removeSteamIdCookie();

    redirect("/");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <PlayerAvatar src={avatarmedium} fallback={personaname[0]} alt={personaname} />

              <span>{personaname}</span>

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={logout}>
              <LogOut />

              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
