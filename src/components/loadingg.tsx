import Image from "next/image";
import React from "react";
import { BarLoader } from "react-spinners";

const Loadingg = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <BarLoader color="gray" />
    </div>
  );
};

export default Loadingg;
