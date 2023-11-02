"use client";
import AnimeCard from "@/components/animeCard";
import BarPagination from "@/components/barPagination";
import Loadingg from "@/components/loadingg";
import { useGetAnimeSearch } from "@/lib/tanstack/queries";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { keyword: string } }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<boolean>(false);
  const { data, isPending } = useGetAnimeSearch(params.keyword, currentPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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

  return (
    <section className="flex flex-col ">
      <BarPagination
        title={params.keyword}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        maxPage={maxPage}
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

export default Page;
