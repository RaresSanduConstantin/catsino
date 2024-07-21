"use client"
import React, { useState, useEffect } from "react";
import { Clover, Dices, Heart, Medal } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";

const HomePageGames = () => {
    const [images, setImages] = useState([]); // State to store images

    useEffect(() => {
        // Fetch images when component mounts
        const fetchImages = async () => {
            try {
                const response = await fetch('https://catsino-backend-kciqjixkwa-ey.a.run.app/photos?limit=10');
                const data = await response.json();
                console.log('data', data)
                setImages(data); // Set fetched images to state
            } catch (error) {
                console.error("Failed to fetch images:", error);
            }
        };
        fetchImages();
    }, []);
    
    const carouselData = [
        {
            title: "Recommended",
            icon: <Heart fill="red" size={30} color="red" />,
            bgColor: "red-500"
        },
        {
            title: "Win Big Prizes",
            icon: <Clover size={30} color="green" />,
            bgColor: "green-500"
        },
        {
            title: "New Games",
            icon: <Dices size={30} color="white" />,
            bgColor: "yellow-500"
        },
        {
            title: "Popular Games",
            icon: <Medal size={30} color="yellow" />,
            bgColor: "yellow-500"
        }
    ];

    const CarouselSection = ({ title, icon, bgColor }: any) => (
        <div className="flex flex-col">
            <Link href={'/games'} className="text-4xl font-semibold flex items-center gap-5">{icon}{title}</Link>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full pt-5"
            >
                <CarouselContent>
                    {images.map((img: any, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                            <div className="p-1 relative group">
                                <Card className="relative overflow-hidden rounded-lg shadow-lg">
                                    <Image
                                        src={img.thumbnailUrl}
                                        alt={`Image ${index}`}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                        unoptimized={true} // use unoptimized if your server doesn't support optimized image delivery
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <Link
                                            href={`/games/${index}`}
                                            className='text-lg font-semibold text-white no-underline'
                                        >
                                            <button className='border bg-gradient-to-t from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-transparent border-yellow-500 font-bold rounded-full px-10 py-2 text-white'>
                                                Play Now
                                            </button>
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className={`bg-${bgColor}`} />
                <CarouselNext className={`bg-${bgColor}`} />
            </Carousel>
        </div>
    );


    return (
        <div className="flex flex-col gap-10 mt-10 container">
            {carouselData.map((data, index) => (
                <CarouselSection key={index} {...data} />
            ))}
        </div>
    );
};

export default HomePageGames;
