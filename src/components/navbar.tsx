"use client";
import Link from "next/link";
import { InputGroup } from "./ui/inputGroup";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  return (
    <nav className="bg-black z-50 flex justify-between p-4 sticky top-0 border-b-2 border-white items-center">
      <Link href={"/"}>
        <p className="text-xl font-bold text-white">WIBUPEDIA</p>
      </Link>

      <InputGroup
        placeholder="Search anime"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onClick={() => {
          router.push(`/search/${keyword.replace(" ", "-")}`);
          setKeyword("");
        }}
        icon={<FaSearch />}
      />
    </nav>
  );
};

export default Navbar;
