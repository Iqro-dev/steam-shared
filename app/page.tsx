"use client";

import { formSchema, SteamIdForm } from "@/components/steam-id-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useSteamIdCookie } from "./hooks/use-steam-id-cookie";
import { Card, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { setSteamIdCookie } = useSteamIdCookie();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSteamIdCookie(values.steamId);

    router.push("/profile");
  }

  return (
    <div className="w-full flex justify-center pt-12">
      <Card className="p-6 w-96 shadow-primary">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
          Steam Shared Games
        </CardTitle>

        <SteamIdForm onSubmit={onSubmit} />
      </Card>
    </div>
  );
}
