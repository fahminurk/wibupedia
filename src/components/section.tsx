"use client";
import Card from "./card";
import { SeasonsClient, Anime, TopClient } from "@tutkli/jikan-ts";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loadingg from "./loadingg";

type SectionProps = {
  title: string;
  link: string;
};

const Section: React.FC<SectionProps> = ({ title, link }) => {
  const seasonsClient = new SeasonsClient();
  const topClient = new TopClient();
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    if (title === "SEASONAL ANIME") {
      setIsLoading(true);
      try {
        const res = await seasonsClient.getSeasonNow();
        setAnimes(res.data);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else if (title === "TOP ANIME") {
      setIsLoading(true);
      try {
        const res = await topClient.getTopAnime();
        setAnimes(res.data);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const res = await seasonsClient.getSeasonUpcoming();
        setAnimes(res.data);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loadingg />
      ) : (
        <section className="flex flex-col my-2">
          <div className="bg-white py-1 px-4 rounded-lg mx-2 sticky top-[80px] z-20 flex justify-between mb-2 items-center">
            <h2 className="font-bold ">{title}</h2>
            <Link href={link}>
              <Button size={"sm"}>Show All</Button>
            </Link>
          </div>
          <div className="flex gap-4 flex-wrap justify-center py-2">
            {animes.slice(0, 6).map((val, i) => (
              <Card key={i} val={val} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Section;
