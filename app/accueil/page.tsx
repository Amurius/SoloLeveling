"use client"
import NavBar from '@/components/navbar/NavBar';
import { Link } from '@nextui-org/react';
import { cookies } from 'next/headers';
import { useSearchParams } from 'next/navigation';


export default function Accueil() {
  const searchParams = useSearchParams();
  const logged = searchParams.get("in");
  // if (user?.value != undefined) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className=' flex h-[91vh]'>
        <div className=' flex flex-col items-center h-full w-full gap-48'>
        <h1 className=' p-12'>Bienvenue sur le MMO Solo Leveling !</h1>
        {
          logged != "yes" ?
          <Link href="/accueil/login" className=' xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-2xl text-red-700 drop-shadow-glow-red'>COMBATTRE</Link>
          :
          <Link href="/combat" className=' xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-2xl text-red-700 drop-shadow-glow-red'>COMBATTRE</Link>
        }
        </div>
      </div>
    </>
  );
  // } else {

  // }
}