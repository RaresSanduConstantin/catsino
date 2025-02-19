"use client"
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]); 

  if (status === 'loading') {
    return <Loading />;
  }



  return (
    <div className=" ">
        {status === 'authenticated' && children}
    </div>
  );
}
