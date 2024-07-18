import { SignupComponent } from '@/components/Signup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Leaderboard | Catsino",
  description: "A leaderboard for the Catsino casino",
};



const Signup = () => {
  return (
    <div className=''>

      <SignupComponent />
    </div>
  );
};
export default Signup;
