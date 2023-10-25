"use client";
import { Button } from "@/components/ui/button";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { SeasonsClient, Anime, JikanPagination } from "@tutkli/jikan-ts";
import Loadingg from "@/components/loadingg";
import CardNew from "@/components/cardNew";
import { AiOutlineArrowUp } from "react-icons/ai";
import clsx from "clsx";
import { getSeason } from "@/utils/getSeason";
import { Select } from "@/components/ui/select";
import { yearOptions, seasonOptions } from "@/constants";

type SeasonProps = {
  data: Anime[];
  paginaton?: JikanPagination;
};

const Season = () => {
  const seasonsClient = new SeasonsClient();
  const [seasonData, setSeasonData] = useState<SeasonProps | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const nowYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(nowYear);
  const [season, setSeason] = useState<string>(getSeason);

  const fetchData = async (page: number, year: number, season: string) => {
    setIsLoading(true);
    try {
      //@ts-ignore
      const res: SeasonProps = await seasonsClient.getSeason(year, season, {
        page,
      });
      setSeasonData(res);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, year, season);
    scrollToTop();
  }, [currentPage, year, season]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleScroll = () =>
    window.scrollY > 500 ? setShowButton(true) : setShowButton(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="flex flex-col ">
      <Button
        className={clsx(
          `fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full`,
          showButton ? "block" : "hidden"
        )}
        onClick={scrollToTop}
      >
        <AiOutlineArrowUp />
      </Button>
      <div className="bg-white py-1 px-4 rounded-lg mx-2 my-3 sticky top-[80px] z-20 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold">SEASON</h2>
          <Select
            value={year}
            options={yearOptions}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
          <Select
            value={season}
            options={seasonOptions}
            onChange={(e) => setSeason(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <p className="hidden md:block text-xs">PAGE {currentPage}</p>
          <Button
            disabled={currentPage === 1}
            size={"sm"}
            onClick={handlePreviousPage}
            variant={"outline"}
          >
            <BiSolidLeftArrow />
          </Button>
          <Button
            disabled={currentPage === 6}
            size={"sm"}
            onClick={handleNextPage}
            variant={"outline"}
          >
            <BiSolidRightArrow />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loadingg />
      ) : (
        <div className="flex gap-4 flex-wrap justify-center px-2">
          {seasonData?.data.map((val, i) => (
            <CardNew key={i} val={val} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Season;
