"use client"
import { AlignJustify, Cat, Club, PawPrint, Trophy } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'


const MobileMenu = () => {
  const { data: session, status } = useSession();
 

  return (
    <Sheet>
        <SheetTrigger className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
            <AlignJustify className='dark:text-light-theme' />
        </SheetTrigger>
        <SheetContent className='bg-gray-950 '>
            <SheetHeader className='mb-20 '>
            <SheetTitle>                    <span className='text-yellow-500 font-semibold font-sans text-3xl tracking-widest'>
                        <Link href='/' className='flex flex-col items-center justify-center'>
                            CATSINO
                            <Cat />
                        </Link>
                    </span></SheetTitle>
            

            </SheetHeader>

            
            <div className='mb-10 pt-20' >
              
            <SheetTrigger asChild>
              <Link href='/' className='flex flex-row items-center justify-center text-lg gap-1'>
              <PawPrint width={20} className='text-yellow-500' /> Home
              </Link>
            </SheetTrigger>
            
            
            </div>

            <div className='mb-10' >
            <SheetTrigger asChild>
              <Link href='/leaderboard' className='flex flex-row items-center justify-center text-lg gap-1'>
              <Trophy width={20} className='text-yellow-500' /> Leaderbord
              </Link>
              </SheetTrigger>
            
            </div>

            <div className='mb-10' >
            <SheetTrigger asChild>
              <Link href='/games' className='flex flex-row items-center justify-center text-xl gap-1'>
              <Club width={20} className='text-red-600 hover:text-yellow-500' /> Games
              </Link>
              </SheetTrigger>
            
            </div>


        <SheetFooter className='pt-20'>

        <div className='flex gap-10 items-center justify-center'>
        {status === 'authenticated' ? (
                    <div className='flex flex-col items-center gap-4'>
                    <span className="text-center flex flex-col ">Welcome <span className='bg-yellow-500 p-1 rounded-md'>{session?.user?.email}</span></span>
                    <button
                        onClick={() => signOut()}
                        className="border border-yellow-400 rounded-full px-5 py-2 hover:bg-yellow-500"
                    >
                        Logout
                    </button>
                </div>
                ) : (
                    <>           <Link
                    href='/login'
                    className='border border-yellow-400 rounded-full px-5 py-2'
                >
                    Login
                </Link>
                <Link
                    href='/signup'
                    className='border bg-red-500 border-red-500 font-bold rounded-full px-5 py-2'
                >
                    Signup
                </Link>
                </>
                )}
          </div>

</SheetFooter>

        </SheetContent>

    </Sheet>
  )
}

export default MobileMenu