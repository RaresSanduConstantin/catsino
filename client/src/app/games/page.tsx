import { Metadata } from 'next';
import GamesCarousel from '@/components/GamesCarousel';
import GameList from '@/components/GameList';

export const metadata: Metadata = {
  title: "Leaderboard | Catsino",
  description: "A leaderboard for the Catsino casino",
};



const Games = () => {
  return (
    <div className='mt-20 md:mt-0 flex flex-col w-full'>
      <GamesCarousel />
      <p className="text-4xl font-semibold flex items-center mt-10 md:ml-20">Try out all our slots</p>
      <GameList />
    </div>
  );
};
export default Games;
