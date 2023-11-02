"use client";
import React, { useEffect, useState } from "react";
import Loadingg from "@/components/loadingg";
import AnimeCard from "@/components/animeCard";
import BarPagination from "@/components/barPagination";
import { useGetSeasonUpcoming } from "@/lib/tanstack/queries";

const Upcoming = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<boolean>(false);
  const { data, isPending } = useGetSeasonUpcoming(currentPage);

  useEffect(() => {
    if (data && data.data.length < 25) {
      setMaxPage(true);
    } else {
      setMaxPage(false);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
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

export default Upcoming;
