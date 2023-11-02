"use client";
import React, { useEffect, useState } from "react";
import { Anime, JikanPagination, AnimeSeason } from "@tutkli/jikan-ts";
import Loadingg from "@/components/loadingg";
import AnimeCard from "@/components/animeCard";
import { getSeason } from "@/utils/getSeason";
import BarPagination from "@/components/barPagination";
import { useGetSeason } from "@/lib/tanstack/queries";

const Season = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const nowYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(nowYear);
  const [season, setSeason] = useState<string>(getSeason);
  const [maxPage, setMaxPage] = useState<boolean>(false);
  const { data, isPending } = useGetSeason(
    currentPage,
    year,
    season as AnimeSeason
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, year, season]);

  useEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  }, [year, season]);

  useEffect(() => {
    if (data && data.data.length < 25) {
      setMaxPage(true);
    } else {
      setMaxPage(false);
    }
  }, [data]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(e.target.value);
  };
  const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value));
  };

  return (
    <section className="flex flex-col ">
      <BarPagination
        title="SEASON"
        maxPage={maxPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={currentPage}
        handleYear={handleYear}
        handleSeason={handleSeason}
      />
      {isPending ? (
        <div className="h-screen flex items-center justify-center">
          <Loadingg />
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap justify-center px-2">
          {data?.data.map((val, i) => (
            <AnimeCard key={i} val={val} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Season;
