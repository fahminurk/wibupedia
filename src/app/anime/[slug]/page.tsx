"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AnimeClient,
  Anime,
  JikanImages,
  AnimePicture,
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
  }, [slug]);

  return (
    <div className="flex flex-col justify-center items-center p-2 ">
      <div className="flex flex-col items-center md:items-start md:justify-center md:flex-row max-w-6xl w-full gap-2">
        <Image
          src={anime?.images.jpg.large_image_url!}
          alt="cover"
          width={400}
          height={300}
          className="object-cover w-44 md:w-52 lg:w-72 max-h-[550px] md:sticky md:top-20"
        />
        <div className="text-white flex flex-col items-center md:justify-start">
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
            {/* score */}
            <div className="flex flex-col items-center">
              <div className="text-white py-1 px-3 text-xs border-b-2">
                SCORE
              </div>
              <p className="font-bold text-lg md:text-3xl">{anime?.score}</p>
              <p className="text-xs">{anime?.scored_by} users</p>
            </div>
            {/* ranked */}
            <div className="flex flex-col items-center">
              <div className="text-white py-1 px-3 text-xs border-b-2">
                RANKED
              </div>
              <p className="font-bold text-lg md:text-3xl">#{anime?.rank}</p>
            </div>
            {/* popularity */}
            <div className="flex flex-col items-center">
              <div className="text-white py-1 px-3 text-xs border-b-2">
                POPULARITY
              </div>
              <p className="font-bold text-lg md:text-3xl">
                #{anime?.popularity}
              </p>
            </div>
            {/* members */}
            <div className="flex flex-col items-center">
              <div className="text-white py-1 px-3 text-xs border-b-2">
                MEMBERS
              </div>
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
          <div className="flex flex-col py-2 w-full">
            <div className="bg-white py-1 px-2 rounded-lg sticky top-[80px] z-20 flex justify-between mb-2 items-center">
              <p className="text-xl font-bold text-black">SYNOPSIS</p>
            </div>
            <p className="text-sm md:text-base">{anime?.synopsis}</p>
          </div>
          <div className="flex flex-col py-2 w-full">
            <div className="bg-white py-1 px-2 rounded-lg sticky top-[80px] z-20 flex justify-between mb-2 items-center">
              <p className="text-xl font-bold text-black">CHARACTERS</p>
              <Select
                className="w-32 text-black"
                options={countyOptions}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {character?.data.map((val) => (
                <div className="flex justify-between  bg-gray-950 ">
                  <div className="flex  text-xs gap-2">
                    <Image
                      src={val.character.images.jpg.image_url}
                      alt="character"
                      width={70}
                      height={100}
                    />
                    <div>
                      <p className="font-bold">{val.character.name}</p>
                      <p>{val.role}</p>
                    </div>
                  </div>
                  {val.voice_actors
                    .filter((val) => val.language === country)
                    .map((val) => (
                      <div className="flex text-right text-xs gap-2">
                        <div className="w-20">
                          <p className="font-bold">{val.person.name}</p>
                          <p>{val.language}</p>
                        </div>
                        <Image
                          src={val?.person.images.jpg.image_url}
                          alt="person"
                          width={70}
                          height={100}
                          className="object-cover"
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
