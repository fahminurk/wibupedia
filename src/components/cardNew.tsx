import { Anime } from "@tutkli/jikan-ts";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
type CardProps = {
  val: Anime;
};

const CardNew: React.FC<CardProps> = ({ val }) => {
  console.log(val);

  return (
    <div className="border-2 border-gray-700 flex flex-col max-w-[360px] w-full ">
      <div className="flex flex-col p-2 justify-center items-center bg-gray-700 h-16">
        {/* judul jpn */}
        <p className="text-white font-bold text-xs text-center">{val.title}</p>
        {/* jdl eng */}
        <p className="text-gray-400 text-xs">
          {val.title_english ? val.title_english : "-"}
        </p>
      </div>
      <div className="p-2 flex gap-2 justify-center text-gray-500 text-xs">
        {/* tgl, eps, duration */}
        <p>{format(new Date(val.aired.from), "P")}</p>
        <p>
          {val.episodes} eps, {val.duration.replace("per ep", "")}
        </p>
      </div>
      <div className="flex gap-2 justify-center p-2 bg-gray-700">
        {val.genres.length ? (
          val.genres.map((val, i) => (
            <div className="rounded-full text-xs px-1 bg-white">{val.name}</div>
          ))
        ) : (
          <div className="rounded-full text-xs px-1 bg-white">N/A</div>
        )}
      </div>
      <div className="flex h-screen max-h-60">
        {/* image */}
        <Image
          src={val.images.jpg.large_image_url!}
          alt="cover"
          width={150}
          height={300}
          className=" object-cover w-full max-w-[180px] "
        />
        {/* desc */}
        <div className="p-2 text-white text-xs overflow-y-clip hover:overflow-y-auto">
          {val.synopsis}
        </div>
      </div>
      <div className="flex text-white text-xs p-2 bg-gray-700">
        {/* rating, dll */}
        <p className="p-1">{val.score ? val.score : "N/A"}</p>
        <div className="w-0.5 bg-white" />
        <p className="p-1">{val.rating}</p>
      </div>
    </div>
  );
};

export default CardNew;
