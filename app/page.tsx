"use client";

import { formSchema, SteamForm } from "@/components/steam-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useSteamId } from "./hooks/use-steam-id";

export default function Home() {
  const { setSteamIdCookie } = useSteamId();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSteamIdCookie(values.steamid);
    router.push("/profile");
  }

  return <SteamForm onSubmit={onSubmit} />;
}
