import { fetchApi } from "../fetch-api";
import { STEAM_API_BASE_URL, STEAM_API_ENDPOINTS } from "../config";
import type { Player, PlayerSummariesResponse } from "../types";

export const getPlayerSummaries = async (steamIds: string): Promise<Player[]> => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  if (!API_KEY) {
    throw new Error("Steam API key is not defined in environment variables");
  }

  const endpoint = `${STEAM_API_BASE_URL}${STEAM_API_ENDPOINTS.PLAYER_SUMMARIES}/?key=${API_KEY}&steamids=${steamIds}`;

  try {
    const response = await fetchApi<PlayerSummariesResponse>(endpoint);
    return response.response.players;
  } catch (error) {
    console.error("Error fetching player summaries:", error);
    throw error;
  }
};
