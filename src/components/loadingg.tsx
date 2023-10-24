import Image from "next/image";
import React from "react";

const Loadingg = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Image src={"/spinner.svg"} alt="loading" width={50} height={50} />
    </div>
  );
};

export default Loadingg;
