import { Player } from "@/app/api/types";
import { CURRENT_ID_PARAM, sidebarItems } from "@/constants";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PlayerDropdown } from "./player-dropdown";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

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
        <SidebarMenu>
          {sidebarItems.map(({ title, items }) => (
            <Collapsible key={title} defaultOpen className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex items-center gap-2 w-full cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors">
                    <span>{title}</span>

                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                  {items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={
                            item.title === "Shared Games"
                              ? `${item.url}?${CURRENT_ID_PARAM}=${currentPlayer.steamid}`
                              : item.url
                          }
                          className="flex items-center gap-2"
                        >
                          <item.icon className="h-4 w-4" />

                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
