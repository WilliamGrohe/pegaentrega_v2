'use client'

import Link from 'next/link';


import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter()
  const { user, handleSignOut } = useAuth()

  // const nav = document.querySelector('#header nav')
  const nav = document.getElementById('menu')

  /*
  if(!nav){
    router.push('/home') 
  }
  */


  function heandleMenuToggle() {
    nav?.classList.toggle('show');
  }

  function heandleMenuClose() {
    nav?.classList.remove('show');
  }
 
  return (
    <header id="header" className='flex w-full top-0 left-0 sticky z-50 border-b-2 border-zinc-800 border-solid bg-zinc-200 py-0 px-1'>
      <nav id="menu" className="h-16 px-4 flex w-full justify-between items-center">
        <a className="font-bold text-2xl text-zinc-950" href="#home">pega<span className='text-emerald-600'>entrega</span>.</a>
        
        <div className="text-zinc-950">
          <nav className='flex gap-4 cursor-pointer'>
            <a href="#">Inicio</a>
            <a href="#">Histórico</a>
            <a href="#">Logout</a>
          </nav>
        </div>
      </nav>
    </header>
  );

}