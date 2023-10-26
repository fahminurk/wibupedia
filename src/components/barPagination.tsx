import React from "react";
import { Button } from "./ui/button";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { Select } from "./ui/select";
import { seasonOptions, yearOptions } from "@/constants";

type BarPageProps = {
  currentPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  title: string;
  maxPage: boolean;
  handleSeason?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleYear?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const BarPagination: React.FC<BarPageProps> = ({
  currentPage,
  handleNextPage,
  handlePreviousPage,
  title,
  maxPage,
  handleSeason,
  handleYear,
}) => {
  return (
    <div className="bg-white py-1 px-4 rounded-lg mx-2 my-3 sticky top-[80px] z-20 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <h2 className="font-bold">{title.replace("-", " ")}</h2>
        {title === "SEASON" && (
          <>
            <Select options={yearOptions} onChange={handleYear} />
            <Select options={seasonOptions} onChange={handleSeason} />
          </>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <p className="hidden md:block text-xs">PAGE {currentPage}</p>
        <Button
          disabled={currentPage === 1}
          size={"sm"}
          onClick={handlePreviousPage}
          variant={"outline"}
        >
          <BiSolidLeftArrow />
        </Button>
        <Button
          disabled={maxPage}
          size={"sm"}
          onClick={handleNextPage}
          variant={"outline"}
        >
          <BiSolidRightArrow />
        </Button>
      </div>
    </div>
  );
};

export default BarPagination;
