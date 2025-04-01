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
              <Image
                src={avatarmedium}
                alt={personaname}
                width={100}
                height={100}
                className="w-8 h-8 rounded-full select-none"
                draggable={false}
              />

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
