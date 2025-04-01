import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { STEAM_ID_COOKIE } from "../constants";
import { getPlayerSummaries } from "../api/fetchers/get-player-summaries";

export interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const steamId = (await cookies()).get(STEAM_ID_COOKIE)?.value;

  if (!steamId) return null;

  const currentPlayer = await getPlayerSummaries(steamId);

  return (
    <SidebarProvider>
      <AppSidebar currentPlayer={currentPlayer[0]} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
