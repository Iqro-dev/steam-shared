"use client";

import { formSchema, SteamIdForm } from "@/components/steam-id-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useSteamIdCookie } from "./hooks/use-steam-id-cookie";

export default function Home() {
  const { setSteamIdCookie } = useSteamIdCookie();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSteamIdCookie(values.steamid);
    router.push("/profile");
  }

  return <SteamIdForm onSubmit={onSubmit} />;
}
