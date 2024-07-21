"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from './Loading';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface Game {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const Game = dynamic(() => import('./Game'), {
    loading: () => <Loading />,
    ssr: true
});

const GameList = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('https://catsino-backend-kciqjixkwa-ey.a.run.app/photos');
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Failed to fetch games:', error);
            }
        };
        fetchGames();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <div className='flex flex-col lg:flex-row'>
            <p className="text-4xl font-semibold flex items-center mt-10 ml-5 md:ml-20">Try out all our slots</p>
            <div className="relative px-16 pt-10 w-full lg:w-1/3 ">
            <Search className="absolute text-yellow-500 left-20 top-12" />
                <Input type="text"
                    placeholder="Search"
                    onChange={handleSearchChange}
                    className="w-full p-4 text-lg border-4 focus:border-current focus:ring-0 rounded-full shadow text-black border-yellow-500"
                    style={{ paddingLeft: '45px' }}
                />
            </div>
        </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2 md:px-16 pt-20">
                {filteredGames.map(game => <Game key={game.id} game={game} />)}
            </div>
        </>
    );
};

export default GameList;
