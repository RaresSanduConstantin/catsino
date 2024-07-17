"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import  Loading  from './Loading';

interface Game {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }

const Game = dynamic(() => import('./Games'), {
  loading: () => <Loading />,
  ssr: false
});

const GameList = () => {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/photos');
                const data = await response.json();
                setGames(data.slice(0, 1000));
            } catch (error) {
                console.error('Failed to fetch games:', error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-16 py-5">
            {games.map(game => <Game key={game.id} game={game} />)}
        </div>
    );
};

export default GameList;
