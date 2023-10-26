"use client";
import { Button } from "@/components/ui/button";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { SeasonsClient, Anime, JikanPagination } from "@tutkli/jikan-ts";
import Loadingg from "@/components/loadingg";
import AnimeCard from "@/components/animeCard";
import { getSeason } from "@/utils/getSeason";
import { Select } from "@/components/ui/select";
import { yearOptions, seasonOptions } from "@/constants";
import BarPagination from "@/components/barPagination";

type SeasonProps = {
  data: Anime[];
  paginaton?: JikanPagination;
};

const Season = () => {
  const seasonsClient = new SeasonsClient();
  const [seasonData, setSeasonData] = useState<SeasonProps | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nowYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(nowYear);
  const [season, setSeason] = useState<string>(getSeason);
  const [maxPage, setMaxPage] = useState<boolean>(false);

  const fetchData = async (page: number, year: number, season: string) => {
    setIsLoading(true);
    try {
      //@ts-ignore
      const res: SeasonProps = await seasonsClient.getSeason(year, season, {
        page,
      });
      if (res?.data.length < 25) {
        setMaxPage(true);
      } else {
        setMaxPage(false);
      }
      setSeasonData(res);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, year, season);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, year, season]);

  useEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  }, [year, season]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
      {isLoading ? (
        <Loadingg />
      ) : (
        <div className="flex gap-4 flex-wrap justify-center px-2">
          {seasonData?.data.map((val, i) => (
            <AnimeCard key={i} val={val} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Season;
