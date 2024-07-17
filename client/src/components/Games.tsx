"use client";

import React from 'react';
import { Card } from './ui/card';
import Link from 'next/link';

interface GameProps {
    game: {
      id: number;
      title: string;
      thumbnailUrl: string;
      url: string;
    };
  }
  

  const Games: React.FC<GameProps> = ({ game }) => {
    return (
        <div key={game.id} className="relative group">
            <Card className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                    src={game.thumbnailUrl}  // Assuming this is the correct URL path
                    alt={game.title}
                    className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link href='/signup'>
                        <button className='border bg-gradient-to-t from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-transparent border-yellow-500 font-bold rounded-full px-6 py-2 text-white'>
                            Play Now
                        </button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Games;
