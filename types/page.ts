import { FRIEND_ID_PARAM } from "@/constants";

export type SharedGamesPageSearchParams = {
  [FRIEND_ID_PARAM]: string;
};

export type SharedGamesPageProps = {
  searchParams: Promise<SharedGamesPageSearchParams>;
};
