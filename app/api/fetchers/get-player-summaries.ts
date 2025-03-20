import { fetchApi } from "../fetch-api";
import { API_ENDPOINTS } from "../config";
import type {} from "../types";
import { Player, PlayerSummariesResponse } from "../types/player";

export const getPlayerSummaries = async (steamIds: string): Promise<Player[]> => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  if (!API_KEY) {
    throw new Error("Steam API key is not defined in environment variables");
  }

  const endpoint = `${API_ENDPOINTS.STEAM.BASE_URL}${API_ENDPOINTS.STEAM.ROUTES.PLAYER_SUMMARIES}/?key=${API_KEY}&steamids=${steamIds}`;

  try {
    const response = await fetchApi<PlayerSummariesResponse>(endpoint);
    return response.response.players;
  } catch (error) {
    console.error("Error fetching player summaries:", error);
    throw error;
  }
};
