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
    <header id="header" className='flex w-full top-0 left-0 fixed z-50 bg-zinc-200 py-0 px-1'>
      <nav id="menu" className="container">
        <a className="logo" href="#home">pega<span>entrega</span>.</a>
        <div className="menu">
          <ul className="grid">
            <li><Link href="/home" className="title" onClick={heandleMenuClose}>Início</Link></li>
            <li><Link href="/newdelivery" className="title" onClick={heandleMenuClose}>Nova Entrega</Link></li>
            <li><a className="title" onClick={heandleMenuClose} href="#services">Agenda</a></li>
            <li><a className="title" onClick={heandleMenuClose} href="#testemonials">...</a></li>
          </ul>
          <div className="userSection">
            <h4>{user?.name}</h4>
            <h5>{user?.email}</h5>
            <Link href="/" onClick={handleSignOut}>Logout</Link>
          </div>
        </div>

        <div id="burger" className="toggle icon-menu" onClick={heandleMenuToggle} ><i className="fas fa-bars"></i></div>
        <div className="toggle icon-cross" onClick={heandleMenuToggle}><i className="fas fa-times"></i></div>
      </nav>
    </header>
  );

}