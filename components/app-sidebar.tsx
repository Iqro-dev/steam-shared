import { Player } from "@/app/api/types";
import { sidebarItems } from "@/app/constants";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { PlayerDropdown } from "./player-dropdown";

export interface AppSidebarProps {
  currentPlayer: Player;
}

export function AppSidebar({ currentPlayer }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <PlayerDropdown currentPlayer={currentPlayer} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

          <SidebarMenu>
            {sidebarItems.map(({ title, url, icon: Icon }) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton asChild>
                  <Link href={url}>
                    <Icon />

                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
