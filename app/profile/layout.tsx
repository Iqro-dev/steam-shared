import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { cookies } from "next/headers";
import { getPlayerSummaries } from "../api/fetchers/get-player-summaries";
import { STEAM_ID_COOKIE } from "@/constants";

export const metadata: Metadata = {
  title: "Steam Shared",
  description: "Check what games you share with your friends",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;

  if (!steamId) return null;

  const currentPlayer = await getPlayerSummaries(steamId);

  return (
    <SidebarProvider>
      <AppSidebar currentPlayer={currentPlayer[0]} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <Breadcrumbs />
        </header>

        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
