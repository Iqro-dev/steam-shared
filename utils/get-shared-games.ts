"use server";

import { getOwnedGames } from "@/app/api/fetchers/get-owned-games";

export async function getSharedGames(userId: string, friendId: string) {
  const [games, yourGames] = await Promise.all([
    getOwnedGames(friendId, true, true),
    getOwnedGames(userId, true, true),
  ]);

  if (!games || !yourGames) {
    return [];
  }

  const filteredGames = games.filter((game) => {
    const yourGame = yourGames.find((ownedGame) => ownedGame.appid === game.appid);
    return yourGame;
  });

  return filteredGames;
}
