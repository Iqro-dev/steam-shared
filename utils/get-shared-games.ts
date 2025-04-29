"use server";

import { getOwnedGames } from "@/app/api/fetchers/get-owned-games";

export async function getSharedGames(userId: string, secondUserId: string) {
  const [firstPlayerGames, secondPlayerGames] = await Promise.all([
    getOwnedGames(userId, true, true),
    getOwnedGames(secondUserId, true, true),
  ]);

  if (!firstPlayerGames || !secondPlayerGames) {
    return {
      sharedGames: [],
      firstPlayerGames: [],
      secondPlayerGames: [],
    };
  }

  const sharedGames = firstPlayerGames.filter((game) => {
    const yourGame = secondPlayerGames.find((ownedGame) => ownedGame.appid === game.appid);
    return yourGame;
  });

  return {
    sharedGames,
    firstPlayerGames,
    secondPlayerGames,
  };
}
