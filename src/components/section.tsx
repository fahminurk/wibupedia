"use client";
import Card from "./card";
import { Button } from "./ui/button";
import Link from "next/link";
import Loadingg from "./loadingg";
import {
  useGetSeasonNow,
  useGetSeasonUpcoming,
  useGetTopAnime,
} from "@/lib/tanstack/queries";

type SectionProps = {
  title: string;
  link: string;
};

const Section: React.FC<SectionProps> = ({ title, link }) => {
  let animes;

  switch (title) {
    case "SEASONAL ANIME":
      animes = useGetSeasonNow();
      break;
    case "TOP ANIME":
      animes = useGetTopAnime();
      break;
    case "UPCOMING ANIME":
      animes = useGetSeasonUpcoming();
      break;
    default:
      break;
  }

  return (
    <section className="flex flex-col my-2">
      <div className="bg-white py-1 px-4 rounded-lg mx-2 sticky top-[80px] z-20 flex justify-between mb-2 items-center">
        <h2 className="font-bold ">{title}</h2>
        <Link href={link}>
          <Button size={"sm"}>Show All</Button>
        </Link>
      </div>
      {animes?.isPending ? (
        <div className="flex items-center justify-center h-52">
          <Loadingg />
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap justify-center py-2">
          {animes?.data?.data.slice(0, 6).map((val, i) => (
            <Card key={i} val={val} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Section;
