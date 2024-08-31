"use client";

import Button from "@/components/Button";
import Video from "@/components/Video";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PacmanLoader } from 'react-spinners';
import Loading from "@/components/Loading";

const Home = () => {
  const [fade, setFade] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Show the loading screen for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setFade(true);
    setTimeout(() => {
      router.push("/Play");
    }, 1000);
  };

  if(loading) {
    return <Loading />
  }

  return (
    <div className="relative h-screen">
      
      <div
        className={`relative z-10 flex flex-col items-center justify-center px-4 gap-10 h-full w-full text-white transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        }`}>
        <h1 className="text-7xl font-primary">Soduko</h1>
        <div className="font-primary lg:w-[40%] md:w-[60%] w-[80%] text-center text-2xl ">
          Challenge your mind with our web-based Sudoku game, offering endless puzzles to test your
          logic and sharpen your skills. Dive in and solve grids anytime, anywhere!
        </div>
        <div onClick={handleClick}>
          <Button text="Play Now" />
        </div>
      </div>
    </div>
  );
};

export default Home;
