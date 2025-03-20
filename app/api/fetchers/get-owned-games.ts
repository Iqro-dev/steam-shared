import { fetchApi } from "../fetch-api";
import { STEAM_API_BASE_URL, STEAM_API_ENDPOINTS } from "../config";
import { Game, GetOwnedGamesResponse } from "../types/game";

export const getOwnedGames = async (
  steamId: string,
  appInfo: boolean,
  playedFree: boolean
): Promise<Game[]> => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  if (!API_KEY) {
    throw new Error("Steam API key is not defined in environment variables");
  }

  const endpoint = `${STEAM_API_BASE_URL}${STEAM_API_ENDPOINTS.OWNED_GAMES}/?key=${API_KEY}&steamid=${steamId}&include_appinfo=${appInfo}&include_played_free_games=${playedFree}`;

  try {
    const response = await fetchApi<GetOwnedGamesResponse>(endpoint);
    return response.response.games;
  } catch (error) {
    console.error("Error fetching owned games:", error);
    throw error;
  }
};
