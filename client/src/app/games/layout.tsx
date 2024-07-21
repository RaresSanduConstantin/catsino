"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const { data: session, status } = useSession();
  const router = useRouter();

  if(status !== 'authenticated') {
    router.push('/login')
  }

  return (
    <div className=" ">
        {status === 'authenticated' && children}
    </div>
  );
}
