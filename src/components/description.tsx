import { Anime } from "@tutkli/jikan-ts";
import React from "react";

type DescriptionProps = {
  anime: Anime;
};
const Description: React.FC<DescriptionProps> = ({ anime }) => {
  return (
    <>
      <p className="text-xl text-center md:text-3xl lg:text-4xl font-bold">
        {anime?.title}
      </p>
      <p className="text-xs md:text-lg text-gray-400 mb-2">
        {anime?.title_english}
      </p>
      <div className="flex gap-2 justify-center md:justify-start mb-2">
        {anime?.genres.map((genre) => (
          <div className="bg-gray-900 py-1 px-3 rounded-lg text-xs">
            {genre.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 mb-2 gap-2">
        <div className="flex flex-col items-center">
          <div className="text-white py-1 px-3 text-xs border-b-2">SCORE</div>
          <p className="font-bold text-lg md:text-3xl">{anime?.score}</p>
          <p className="text-xs">{anime?.scored_by} users</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white py-1 px-3 text-xs border-b-2">RANKED</div>
          <p className="font-bold text-lg md:text-3xl">#{anime?.rank}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white py-1 px-3 text-xs border-b-2">
            POPULARITY
          </div>
          <p className="font-bold text-lg md:text-3xl">#{anime?.popularity}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white py-1 px-3 text-xs border-b-2">MEMBERS</div>
          <p className="font-bold text-lg md:text-3xl">{anime?.members}</p>
        </div>
      </div>
      <div className="flex gap-2 text-xs mb-2">
        <p>
          {anime?.season} • {anime?.year}
        </p>
        <div className="border-r-[1px]" />
        <p>{anime?.type}</p>
        <div className="border-r-[1px]" />
        <p>{anime?.episodes} eps</p>
        <div className="border-r-[1px]" />
        <p>{anime?.status}</p>
      </div>
    </>
  );
};

export default Description;
