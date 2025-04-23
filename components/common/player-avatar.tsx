import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";

export interface PlayerAvatarProps {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}

export function PlayerAvatar({ src, alt, fallback, className }: PlayerAvatarProps) {
  return (
    <Avatar className={cn("select-none", className)}>
      <Image src={src} alt={alt} fill draggable={false} />

      {!src && <AvatarFallback>{fallback}</AvatarFallback>}
    </Avatar>
  );
}
