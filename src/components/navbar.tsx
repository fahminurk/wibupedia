"use client";
import Link from "next/link";
import { InputGroup } from "./ui/inputGroup";
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="bg-black z-50 flex justify-between p-4 sticky top-0 border-b-2 border-white items-center">
      <Link href={"/"}>
        <p className="text-xl font-bold text-white">WIBUPEDIA</p>
      </Link>

      <InputGroup
        placeholder="Search anime"
        onClick={() => {}}
        icon={<FaSearch />}
      />
    </nav>
  );
};

export default Navbar;
