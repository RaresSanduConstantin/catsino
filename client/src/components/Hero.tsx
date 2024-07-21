import React from "react";
import Image from "next/image";

import Link from "next/link";

const Hero = () => {
    return (

        <div className="w-full pt-10 md:pt-5 ">
            <div className="flex flex-col gap-10 md:gap-0 md:flex-row justify-between items-center pt-10">
                <div className="flex flex-col gap-5 items-center justify-center w-full">
                    <h1 className="text-5xl text-center font-bold text-yellow-300 animate-pulse">Step Into the Feline Fantasy of CATSINO</h1>
                    <p className="text-white text-center text-lg md:w-2/3 bg-opacity-90 
                 p-4 rounded-xl shadow-xl mt-5">
        Dare to roll the dice? Scratch your way to victory? It&apos;s not just playtime it&apos;s your chance to claim the throne at Catsino!
    </p>

    <p className="text-white text-center text-lg md:w-2/3 bg-opacity-20 bg-gray-200 p-4 rounded-xl shadow-2xl">
        Unleash your luck and get your paws on jackpot joy—where every spin could turn into a purrfect win!
    </p>
                    <Link href="/games" className="pt-10">
                        <button className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-3xl font-semibold py-4 px-6 rounded-full hover:scale-110 transition-transform duration-300 ease-in-out">
                            Start Your Adventure
                        </button>
                    </Link>
                </div>


                <Image src="/header3.jpeg" className="rounded-br-full rounded-tl-full " alt="hero" width={1000} height={1000} />
            </div>


        </div>
    );
};

export default Hero;
