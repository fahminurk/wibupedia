"use client";
import Image from "next/image";
import { Anime } from "@tutkli/jikan-ts";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Card = ({ val }: { val: Anime }) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  return (
    <Link href={`/anime/${val.mal_id}`}>
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => router.push("/")}
      >
        <div
          className={clsx(
            `h-full z-10 w-full absolute flex justify-center items-center bg-black transition-opacity`,
            hover ? "bg-opacity-50" : "bg-opacity-0",
            hover ? "scale-105" : "scale-95"
          )}
        >
          <p
            className={clsx(
              `font-bold absolute bottom-0 left-0 p-2 text-white`,
              hover ? "opacity-100" : "opacity-0"
            )}
          >
            {val.title}
          </p>
        </div>
        <img
          src={val.images.jpg.large_image_url!}
          alt="cover"
          width={200}
          height={300}
          loading="lazy"
          className={clsx(
            `object-cover max-h-52 w-40 md:max-h-72 md:w-52 h-screen`,
            hover ? "scale-105" : "scale-95"
          )}
        />
      </div>
    </Link>
  );
};

export default Card;
