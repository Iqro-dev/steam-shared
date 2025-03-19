import { useCookies } from "react-cookie";
import { STEAM_ID_COOKIE } from "../api/constants/cookies";

export function useSteamId() {
  const [cookie, setCookies, removeCookies] = useCookies([STEAM_ID_COOKIE]);

  return {
    steamId: cookie[STEAM_ID_COOKIE] as string,
    setSteamIdCookie: (token: string) => {
      setCookies(STEAM_ID_COOKIE, token, {
        path: "/",
      });
    },
    removeSteamIdCookie: () => {
      removeCookies(STEAM_ID_COOKIE, { path: "/" });
    },
  };
}
