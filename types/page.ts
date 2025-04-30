import { COMPARED_ID_PARAM, CURRENT_ID_PARAM } from "@/constants";

export type SharedGamesPageSearchParams = {
  [CURRENT_ID_PARAM]: string;
  [COMPARED_ID_PARAM]: string;
};

export type SharedGamesPageProps = {
  searchParams: Promise<SharedGamesPageSearchParams>;
};
