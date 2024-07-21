"use client"
import Link from 'next/link'
import { Cat, Club, Trophy, PawPrint } from 'lucide-react'
import MobileMenu from './MobileMenu'
import { useSession, signOut } from 'next-auth/react';


const Navbar = () => {
    const { data: session, status } = useSession();

    return (
        <div className='fixed backdrop-blur-sm bg-gray-950 z-50 top-0 left-0 right-0 h-20 shadow-sm flex items-center justify-between border border-r-0 border-t-0 border-l-0 border-gray-400'>
            <div className='container max-w-full mx-auto w-full h-full flex justify-between items-center'>
                <div className='hidden lg:flex items-start gap-16 pl-10 w-1/4'>
                    <Link href='/' className='flex gap-1 items-center hover:text-yellow-500 font-semibold' >
                        <PawPrint width={20} className='text-yellow-500' /> Home
                    </Link>
                    <Link
                        href="/leaderboard"
                        className='flex gap-1 items-center hover:text-yellow-500 font-semibold'
                    >
                        <Trophy width={20} className='text-yellow-500' /> Leaderbord
                    </Link>
                    <Link
                        href='/games'
                        className='flex gap-1 items-center hover:text-yellow-500 font-semibold'
                    >
                        <Club width={20} className='text-red-600 hover:text-yellow-500' /> Games
                    </Link>
                </div>

     

                <div className='w-full md:w-1/4 flex items-center justify-center'>
                    <span className='text-yellow-500 font-semibold font-sans text-3xl tracking-widest'>
                        <Link href='/' className='flex flex-col items-center justify-center'>
                            CATSINO
                            <Cat />
                        </Link>
                    </span>
                </div>

                <div className='absolute right-10 lg:hidden'>
                {/* <BurgerToggle /> */}
                    <MobileMenu />
                </div>

                <div className='hidden lg:flex gap-10 justify-end pr-10 w-1/4 '>
                {status === 'authenticated' ? (
                    <div className='flex items-center gap-4'>
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

       

            </div>
        </div>
    )
}

export default Navbar