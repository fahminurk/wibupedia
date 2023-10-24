import Card from "./card";
import {
  SeasonsClient,
  JikanResponse,
  Anime,
  TopClient,
} from "@tutkli/jikan-ts";
import { Button } from "./ui/button";
import Link from "next/link";

type SectionProps = {
  title: string;
  link: string;
};

const Section: React.FC<SectionProps> = async ({ title, link }) => {
  let res: Anime[] = [];
  const seasonsClient = new SeasonsClient();
  const topClient = new TopClient();

  switch (title) {
    case "SEASONAL ANIME":
      res = await seasonsClient
        .getSeasonNow()
        .then((res: JikanResponse<Anime[]>) => res.data);
      break;
    case "TOP ANIME":
      res = await topClient
        .getTopAnime()
        .then((res: JikanResponse<Anime[]>) => res.data);
      break;
    default:
      res = [];
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
      <div className="flex gap-4 flex-wrap justify-center py-2">
        {res.slice(0, 6).map((val, i) => (
          <Card key={i} val={val} />
        ))}
      </div>
    </section>
  );
};

export default Section;
