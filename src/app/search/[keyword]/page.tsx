"use client";
import AnimeCard from "@/components/animeCard";
import BarPagination from "@/components/barPagination";
import Loadingg from "@/components/loadingg";
import {
  Anime,
  AnimeClient,
  JikanPagination,
  JikanResponse,
} from "@tutkli/jikan-ts";
import React, { useEffect, useState } from "react";

type PageProps = {
  data: Anime[];
  paginaton?: JikanPagination;
};
const Page = ({ params }: { params: { keyword: string } }) => {
  const animClient = new AnimeClient();
  const [animes, setAnimes] = useState<PageProps | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxPage, setMaxPage] = useState<boolean>(false);
  const fetchData = async (q: string, page: number) => {
    setIsLoading(true);
    try {
      const res = await animClient.getAnimeSearch({ q, page });

      if (res?.data.length < 25) {
        setMaxPage(true);
      } else {
        setMaxPage(false);
      }
      setAnimes(res);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params.keyword, currentPage);

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
        title={params.keyword}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        maxPage={maxPage}
      />
      {isLoading ? (
        <Loadingg />
      ) : (
        <div className="flex gap-4 flex-wrap justify-center px-2">
          {animes?.data.map((val, i) => (
            <AnimeCard key={i} val={val} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Page;
