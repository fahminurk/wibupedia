import { AnimeCharacter } from "@tutkli/jikan-ts";
import Image from "next/image";

type CharacterProps = {
  val: AnimeCharacter;
  country: string;
};
const CharacterCard: React.FC<CharacterProps> = ({ val, country }) => {
  const actor = val.voice_actors.filter(
    (actor) => actor.language === country
  )[0];
  return (
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
      {actor && (
        <div className="flex text-right text-xs gap-2">
          <div className="w-20">
            <p className="font-bold">{actor.person.name}</p>
            <p>{actor.language}</p>
          </div>
          <Image
            src={actor.person.images.jpg.image_url}
            alt="person"
            width={70}
            height={100}
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
