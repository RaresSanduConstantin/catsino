
import Loading from '@/components/Loading';
import { Metadata } from 'next';
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: "Leaderboard | Catsino",
  description: "A leaderboard for the Catsino casino",
};



const Leaderboard = () => {

  const LeaderboardComponent = dynamic(() => import('@/components/Leaderboard'), {
    loading: () => <Loading />,
    ssr: false,
  });
  return (
    <div className='mt-28 md:mt-10 flex flex-col justify-center items-center w-full'>
      <div>
      <h1 className='text-4xl font-bold text-center my-4'>Leaderboard</h1>
<p className='text-lg text-gray-600 max-w-7xl mx-auto text-center mt-2'>
    Welcome to our competitive arena where excellence and achievement are not just recognized but celebrated. Scroll through the leaderboard to see who&apos;s topping the charts with their remarkable skills. From seasoned champions to emerging contenders, each participant shines here, making their mark as they vie for supremacy. Join us in celebrating the thrill of competition and the spirit of victory!
</p>

      </div>
      <div className='w-full h-screen px-2'>

        <LeaderboardComponent />
      </div>
    </div>
  );
};
export default Leaderboard;
