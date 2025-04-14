import { getOwnedGames } from "@/app/api/fetchers/get-owned-games";

export async function getSharedGames(userId: string, friendId: string) {
  const [games, yourGames] = await Promise.all([
    getOwnedGames(friendId, true, true),
    getOwnedGames(userId, true, true),
  ]);

  return games.filter((game) => {
    const yourGame = yourGames.find((ownedGame) => ownedGame.appid === game.appid);
    return yourGame;
  });
}
