"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import clsx from "clsx";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollButton = () => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleScroll = () =>
    window.scrollY > 500 ? setShowButton(true) : setShowButton(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Button
      className={clsx(
        `fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full`,
        showButton ? "block" : "hidden"
      )}
      onClick={scrollToTop}
    >
      <AiOutlineArrowUp />
    </Button>
  );
};

export default ScrollButton;
