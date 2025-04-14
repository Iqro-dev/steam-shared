import { FRIEND_ID } from "../constants/search-params";

export type SharedGamesPageSearchParams = {
  [FRIEND_ID]: string;
};

export type SharedGamesPageProps = {
  searchParams: SharedGamesPageSearchParams;
};
