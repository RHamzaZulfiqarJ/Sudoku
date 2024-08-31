"use client"

import React, { useEffect, useState } from 'react'
import Game from './Game'

const page = () => {

  const [fade, setFade] = useState<Boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative z-10 flex flex-col items-center justify-center mt-10 gap-10 h-full w-full text-black duration-1000 px-10 transition-opacity ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <h1 className='text-7xl font-primary text-white'>Soduko</h1>
      <Game />
    </div>
  )
}

export default page