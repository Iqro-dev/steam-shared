export interface Player {
  avatar: string;
  avatarfull: string;
  avatarhash: string;
  avatarmedium: string;
  communityvisibilitystate: number;
  lastlogoff: number;
  loccountrycode: string;
  personaname: string;
  personastate: number;
  personastateflags: number;
  primaryclanid: string;
  profilestate: number;
  profileurl: string;
  realname: string;
  steamid: string;
  timecreated: number;
}

export interface PlayerSummariesResponse {
  response: {
    players: Player[];
  };
}
