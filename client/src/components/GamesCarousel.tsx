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
        }, 5000);
    
        return () => {
            clearInterval(interval);
            if (api) api.off("select", onSelect);
        };
    }, [api, scrollForward, images.length]);

    return (
        <div className="w-full">
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
