import { fetchApi } from "../fetch-api";
import { STEAM_API_BASE_URL, STEAM_API_ENDPOINTS } from "../config";
import type { Friend, FriendsListResponse } from "../types";

export const getFriendsList = async (steamId: string): Promise<Friend[]> => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  if (!API_KEY) {
    throw new Error("Steam API key is not defined in environment variables");
  }

  const endpoint = `${STEAM_API_BASE_URL}${STEAM_API_ENDPOINTS.FRIENDS_LIST}/?key=${API_KEY}&steamid=${steamId}&relationship=friend`;

  try {
    const response = await fetchApi<FriendsListResponse>(endpoint);
    return response.friendslist.friends;
  } catch (error) {
    console.error("Error fetching friends list:", error);
    throw error;
  }
};
