"use client";

import { PlayerAvatar } from "../common/player-avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Player } from "@/app/api/types";
import Link from "next/link";
import { COMPARED_ID_PARAM, CURRENT_ID_PARAM } from "@/constants";

export interface SharedGamesUserProps {
  selectedUser: Player | null;
  availableOptions: Player[];
  currentUserSteamId: string;
  comparedUserSteamId: string | null | undefined;
  isCurrentUser: boolean;
}

export function SharedGamesUser({
  selectedUser,
  availableOptions,
  currentUserSteamId,
  comparedUserSteamId,
  isCurrentUser,
}: SharedGamesUserProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "p-0 h-32 w-32 rounded-xl border-2 transition-all duration-200 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background",
              isOpen && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
          >
            <div className="relative w-full h-full">
              {selectedUser ? (
                <>
                  <PlayerAvatar
                    src={selectedUser.avatarfull}
                    fallback={selectedUser.personaname}
                    alt={selectedUser.personaname}
                    className="w-full h-full rounded-lg"
                  />

                  <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-1.5 rounded-lg shadow-md">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                  <ChevronDown className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="w-72 p-3"
          sideOffset={8}
          collisionPadding={20}
        >
          <div className="grid grid-cols-4 gap-2">
            {availableOptions.map((option) => (
              <Link
                key={option.steamid}
                href={
                  isCurrentUser
                    ? `?${CURRENT_ID_PARAM}=${option.steamid}&${COMPARED_ID_PARAM}=${comparedUserSteamId || ""}`
                    : `?${CURRENT_ID_PARAM}=${currentUserSteamId}&${COMPARED_ID_PARAM}=${option.steamid}`
                }
              >
                <DropdownMenuItem className="flex flex-col items-center p-2 cursor-pointer hover:bg-accent rounded-lg focus:bg-accent group">
                  <PlayerAvatar
                    src={option.avatarfull}
                    fallback={option.personaname}
                    alt={option.personaname}
                    className="group-hover:ring-2 group-hover:ring-primary transition-all duration-200"
                  />

                  <span className="text-xs font-medium text-center line-clamp-1 w-full mt-2 group-hover:text-primary transition-colors">
                    {option.personaname}
                  </span>
                </DropdownMenuItem>
              </Link>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedUser && (
        <span className="text-lg font-medium text-center max-w-[128px] line-clamp-1">
          {selectedUser.personaname}
        </span>
      )}
    </div>
  );
}
