"use client";
import { Button } from "@/components/ui/button";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { SeasonsClient, JikanPagination, Anime } from "@tutkli/jikan-ts";
import Loadingg from "@/components/loadingg";
import AnimeCard from "@/components/animeCard";

type SeasonProps = {
  data: Anime[];
  paginaton?: JikanPagination;
};

const Upcoming = () => {
  const seasonClient = new SeasonsClient();
  const [animeTop, setAnimeTop] = useState<SeasonProps | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    try {
      const res: SeasonProps = await seasonClient.getSeasonUpcoming({ page });
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
      <div className="bg-white py-1 px-4 rounded-lg mx-2 my-3 sticky top-[80px] z-20 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold">UPCOMING ANIME</h2>
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
            disabled={currentPage === 18}
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
          {animeTop?.data.map((val, i) => (
            <AnimeCard key={i} val={val} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Upcoming;
