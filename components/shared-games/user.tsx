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

export interface SharedGamesUserProps {
  selectedUser: Player | null;
  onSelectUser: (user: Player) => void;
  availableOptions: Player[];
}

export function SharedGamesUser({
  selectedUser,
  onSelectUser,
  availableOptions,
}: SharedGamesUserProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "p-0 h-24 w-24 rounded-lg border-2 transition-all duration-200 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background",
            isOpen && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          )}
        >
          <div className="relative w-full h-full">
            {selectedUser && (
              <PlayerAvatar
                src={selectedUser.avatarfull}
                fallback={selectedUser.personaname}
                alt={selectedUser.personaname}
                classname="w-full h-full rounded-none"
              />
            )}

            <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-tl-md">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-56 p-2" sideOffset={4} collisionPadding={20}>
        <div className="grid grid-cols-3 gap-1">
          {availableOptions.map((option) => (
            <DropdownMenuItem
              key={option.steamid}
              className="flex flex-col items-center p-2 cursor-pointer hover:bg-accent rounded-md focus:bg-accent"
              onClick={() => onSelectUser(option)}
            >
              <PlayerAvatar
                src={option.avatarfull}
                fallback={option.personaname}
                alt={option.personaname}
              />

              <span className="text-xs font-medium text-center line-clamp-1 w-full mt-1">
                {option.personaname}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
