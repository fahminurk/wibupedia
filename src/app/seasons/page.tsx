"use client";
import { Button } from "@/components/ui/button";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { SeasonsClient, Anime, JikanPagination } from "@tutkli/jikan-ts";
import Card from "@/components/card";
import Loadingg from "@/components/loadingg";

type SeasonProps = {
  data: Anime[];
  paginaton?: JikanPagination;
};

const Season = () => {
  const seasonsClient = new SeasonsClient();
  const [seasonData, setSeasonData] = useState<SeasonProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    try {
      const res: SeasonProps = await seasonsClient.getSeasonNow({ page });
      setSeasonData(res);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
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
    <section className="flex flex-col my-2">
      <div className="bg-white py-1 px-4 rounded-lg mx-2 sticky top-[80px] z-20 flex justify-between mb-2 items-center">
        <div className="flex gap-2">
          <h2 className="font-bold">SEASON</h2>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-xs">PAGE {currentPage}</p>
          <Button
            disabled={currentPage === 1}
            size={"sm"}
            onClick={handlePreviousPage}
          >
            <BiSolidLeftArrow />
          </Button>
          <Button
            disabled={currentPage === 6}
            size={"sm"}
            onClick={handleNextPage}
          >
            <BiSolidRightArrow />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loadingg />
      ) : (
        <div className="flex gap-4 flex-wrap justify-center">
          {seasonData?.data.map((val, i) => (
            <Card key={i} val={val} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Season;
