"use client";
import React, { useEffect, useState } from "react";
import { SeasonsClient, JikanPagination, Anime } from "@tutkli/jikan-ts";
import Loadingg from "@/components/loadingg";
import AnimeCard from "@/components/animeCard";
import BarPagination from "@/components/barPagination";

type SeasonProps = {
  data: Anime[];
  paginaton?: JikanPagination;
};

const Upcoming = () => {
  const seasonClient = new SeasonsClient();
  const [animeTop, setAnimeTop] = useState<SeasonProps | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxPage, setMaxPage] = useState<boolean>(false);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    try {
      const res: SeasonProps = await seasonClient.getSeasonUpcoming({ page });
      if (res?.data.length < 25) {
        setMaxPage(true);
      } else {
        setMaxPage(false);
      }
      setAnimeTop(res);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="flex flex-col ">
      <BarPagination
        title="UPCOMING ANIME"
        maxPage={maxPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={currentPage}
      />
      {isLoading ? (
        <Loadingg />
      ) : (
        <div className="flex gap-4 flex-wrap justify-center px-2">
          {animeTop?.data.map((val, i) => (
            <AnimeCard key={i} val={val} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Upcoming;
