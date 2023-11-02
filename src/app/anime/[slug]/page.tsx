"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Loadingg from "@/components/loadingg";
import { Select } from "@/components/ui/select";
import { countyOptions } from "@/constants";
import CharacterCard from "@/components/characterCard";
import Description from "@/components/description";
import { useGetAnimeById, useGetAnimeCharacters } from "@/lib/tanstack/queries";

const Page = () => {
  const params = useParams();
  const { slug } = params;
  const [country, setCountry] = useState<string>("Japanese");

  const { data: anime, isPending: isLoadingAnime } = useGetAnimeById(
    parseInt(slug as string)
  );
  const { data: characters, isPending } = useGetAnimeCharacters(
    parseInt(slug as string)
  );

  return (
    <>
      {isPending && isLoadingAnime ? (
        <div className="flex justify-center items-center h-screen">
          <Loadingg />
        </div>
      ) : (
        <div className="flex flex-col items-center p-2 ">
          <div className="flex flex-col items-center md:items-start md:justify-center md:flex-row max-w-6xl gap-2">
            <img
              src={anime?.data.images.jpg.large_image_url}
              alt="cover"
              width={400}
              height={300}
              loading="lazy"
              className="object-cover w-44 md:w-52 lg:w-72 max-h-[550px] md:sticky md:top-20"
            />

            <div className="text-white flex flex-col items-center md:justify-start w-full">
              <Description anime={anime?.data!} />
              <div className="flex flex-col py-4 w-full border-b-2">
                <p className="text-2xl font-bold py-2">SYNOPSIS</p>
                <p className="text-sm md:text-base ">{anime?.data.synopsis}</p>
              </div>
              <div className="flex flex-col py-4 w-full border-b-2">
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold py-2">CHARACTERS</p>
                  <Select
                    className="w-32 text-black"
                    options={countyOptions}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                  {characters?.data.map((val, i) => (
                    <CharacterCard val={val} key={i} country={country} />
                  ))}
                </div>
              </div>
              <div className=" h-[270px] md:h-[350px] lg:h-[480px] w-full my-2">
                <iframe
                  src={anime?.data.trailer.embed_url}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
