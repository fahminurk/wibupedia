"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AnimeClient,
  Anime,
  JikanPerson,
  CharacterVoiceActor,
  JikanResponse,
  AnimeCharacter,
} from "@tutkli/jikan-ts";
import dynamic from "next/dynamic";
import Loadingg from "@/components/loadingg";
import Image from "next/image";
import { Select } from "@/components/ui/select";
import { countyOptions } from "@/constants";
import CharacterCard from "@/components/characterCard";
import Description from "@/components/description";
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false, // Menghindari hydrasi di sisi server
});

type characterProps = {
  character: JikanPerson[];
  favorite: number;
  role: string;
  voice_actors: CharacterVoiceActor[];
};
const Page = () => {
  const params = useParams();
  const { slug } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [anime, setAnime] = useState<Anime>();
  const [character, setCharacter] = useState<JikanResponse<AnimeCharacter[]>>();
  const animeClient = new AnimeClient();
  const [country, setCountry] = useState<string>("Japanese");

  const fetchData = async (slug: string) => {
    setIsLoading(true);
    try {
      const res = await animeClient.getAnimeFullById(parseInt(slug));
      setAnime(res.data);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchChar = async (slug: string) => {
    setIsLoading(true);
    try {
      const res = await animeClient.getAnimeCharacters(parseInt(slug));
      setCharacter(res);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(slug as string);
    fetchChar(slug as string);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loadingg />
      ) : (
        <div className="flex flex-col items-center p-2 ">
          <div className="flex flex-col items-center md:items-start md:justify-center md:flex-row max-w-6xl gap-2">
            <Image
              src={anime?.images.jpg.large_image_url!}
              alt="cover"
              width={400}
              height={300}
              className="object-cover w-44 md:w-52 lg:w-72 max-h-[550px] md:sticky md:top-20"
            />

            <div className="text-white flex flex-col items-center md:justify-start w-full">
              <Description anime={anime!} />
              <div className="flex flex-col py-4 w-full border-b-2">
                <p className="text-2xl font-bold py-2">SYNOPSIS</p>
                <p className="text-sm md:text-base ">{anime?.synopsis}</p>
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
                  {character?.data.map((val, i) => (
                    <CharacterCard val={val} key={i} country={country} />
                  ))}
                </div>
              </div>
              <div className=" h-[270px] md:h-[350px] lg:h-[480px] w-full my-2">
                <ReactPlayer
                  url={anime?.trailer.embed_url}
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
