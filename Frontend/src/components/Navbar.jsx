import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { Navigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'
import {UserButton} from '@daveyplate/better-auth-ui'

const Navbar = () => {
  const[menuOpen , setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const {data: session } = authClient.useSession()   // read about the sessions
  return (
    <>
       <nav className="z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b text-white border-slate-800">
        <Link to={'/'} className='text-2xl font-extrabold'>
           <img src={logo} alt="" className='h-5 sm:h-7' />
        </Link>

          <div className="hidden lg:flex items-center gap-8 transition duration-500">
            <Link to={'/'} className="hover:text-slate-300 transition">Home</Link>
            <Link to={'/projects'} className="hover:text-slate-300 transition">My Projects</Link>
            <Link to={'/community'} className="hover:text-slate-300 transition">Community</Link>
            <Link to={'/pricing'} className="hover:text-slate-300 transition">Pricing</Link>
 
          </div>

          <div className="hidden lg:block space-x-3">

{   !session?.user ? (
                <button onClick={()=>navigate(`/auth/signin`)}
            className="active:scale-95 hover:bg-indigo-800 transition px-4 py-2 border border-indigo-600 rounded-md">
              Get started
            </button>
):(
<UserButton size='icon'/>
)

            }
            {/* <button className="px-6 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md">
              
            </button> */}
          </div>

          <button id="open-menu" className="lg:hidden active:scale-90 transition" onClick={() => setMenuOpen(true)} >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-[100] bg-black/60 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 lg:hidden transition-transform duration-300">
            <Link to={'/'} onClick={()=> setMenuOpen(false)}>Home</Link>
            <Link to={'/projects'} onClick={()=> setMenuOpen(false)}>My Projects</Link>
            <Link to={'/community'}  onClick={()=> setMenuOpen(false)}>Community</Link>
            <Link to={'/pricing'}  onClick={()=> setMenuOpen(false)}>Pricing</Link>
 
            
            
            <button className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex" onClick={() => setMenuOpen(false)} >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        )}
    </>
    

  )
}

export default Navbar