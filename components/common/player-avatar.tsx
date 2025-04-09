import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";

export interface PlayerAvatarProps {
  src: string;
  fallback: string;
  alt: string;
  classname?: string;
}

export function PlayerAvatar({ src, alt, fallback, classname }: PlayerAvatarProps) {
  return (
    <Avatar className={cn("select-none", classname)}>
      <Image src={src} alt={alt} width={100} height={100} draggable={false} />

      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
