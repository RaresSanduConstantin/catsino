"use client"
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel"
import Link from "next/link";

const GamesCarousel = () => {
    const basePath = '/carousel';
    const numberOfImages = 10;
    const [images, setImages] = useState<string[]>([]);
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [scrollForward, setScrollForward] = useState(true); 

    useEffect(() => {
        const loadedImages = [];
        for (let i = 1; i <= numberOfImages; i++) {
            loadedImages.push(`${basePath}/carousel${i}.jpeg`);
        }
        setImages(loadedImages);
    }, []);

    const onSelect = () => {
        const currentIndex = api?.selectedScrollSnap();
        if (currentIndex === 0) {
            setScrollForward(true);
        } else if (currentIndex === images.length - 1) {
            setScrollForward(false);
        }
    };
    
    useEffect(() => {
        if (!api) return;
        api.on("select", onSelect);
    
        const interval = setInterval(() => {
            if (scrollForward) {
                api.scrollNext();
            } else {
                api.scrollPrev();
            }
        }, 3000);
    
        return () => {
            clearInterval(interval);
            if (api) api.off("select", onSelect);
        };
    }, [api, scrollForward, images.length]);

    return (
        <div className="w-full bg-yellow-500">
            <Carousel className="w-full" setApi={setApi}>
                <CarouselContent>
                    {images.map((imgSrc, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                            <div className="p-1 relative group">
                                <Card className="relative overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        src={imgSrc}
                                        alt={`Carousel Image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link href={`/games/${index}`}>
                        <button className='border bg-gradient-to-t from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-transparent border-yellow-500 font-bold rounded-full px-10 py-5 text-white'>
                            Play Now
                        </button>
                    </Link>
                </div>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default GamesCarousel;
