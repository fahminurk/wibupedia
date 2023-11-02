import { useQuery } from "@tanstack/react-query";
import {
  AnimeClient,
  AnimeSeason,
  SeasonsClient,
  TopClient,
} from "@tutkli/jikan-ts";

// type SeasonProps = {
//   data: Anime[];
//   paginaton?: JikanPagination;
// };
const topClient = new TopClient();
const seasonsClient = new SeasonsClient();
const animeClient = new AnimeClient();
export const useGetSeason = (
  page: number,
  year: number,
  season: AnimeSeason
) => {
  return useQuery({
    queryKey: ["season", year, season, page],
    queryFn: async () => {
      let res = await seasonsClient.getSeason(year, season, {
        page,
      });
      return res;
    },
  });
};

export const useGetSeasonNow = () => {
  return useQuery({
    queryKey: ["seasonNow"],
    queryFn: async () => {
      let res = await seasonsClient.getSeasonNow();
      return res;
    },
  });
};

export const useGetTopAnime = (page?: number) => {
  return useQuery({
    queryKey: ["topAnime", page],
    queryFn: async () => {
      let res = await topClient.getTopAnime({ page });
      return res;
    },
  });
};

export const useGetSeasonUpcoming = (page?: number) => {
  return useQuery({
    queryKey: ["seasonUpcoming", page],
    queryFn: async () => {
      let res = await seasonsClient.getSeasonUpcoming({ page });
      return res;
    },
  });
};

export const useGetAnimeSearch = (q: string, page: number) => {
  return useQuery({
    queryKey: ["animeSearch", q, page],
    queryFn: async () => {
      let res = await animeClient.getAnimeSearch({ q, page });
      return res;
    },
  });
};

export const useGetAnimeById = (id: number) => {
  return useQuery({
    queryKey: ["animeById", id],
    queryFn: async () => {
      let res = await animeClient.getAnimeFullById(id);
      return res;
    },
  });
};

export const useGetAnimeCharacters = (id: number) => {
  return useQuery({
    queryKey: ["animeCharacters", id],
    queryFn: async () => {
      let res = await animeClient.getAnimeCharacters(id);
      return res;
    },
  });
};
