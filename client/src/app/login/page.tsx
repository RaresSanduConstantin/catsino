import { LoginComponent } from '@/components/Login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Leaderboard | Catsino",
  description: "A leaderboard for the Catsino casino",
};



const Login = () => {
  return (
    <div className=''>

      <LoginComponent />
    </div>
  );
};
export default Login;
