"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { Card, CardTitle } from "@/components/ui/card";
import { steamIdSchema } from "@/lib/validations/steam-id";
import { SteamIdForm } from "@/components/form/steam-id-form";
import { useSteamIdCookie } from "@/hooks/use-steam-id-cookie";

export default function Login() {
  const { setSteamIdCookie } = useSteamIdCookie();

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof steamIdSchema>) => {
    try {
      setSteamIdCookie(values.steamId);

      router.push("/profile");
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

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
