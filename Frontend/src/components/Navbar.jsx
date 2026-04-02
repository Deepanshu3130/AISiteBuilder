import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { Navigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'
import {UserButton} from '@daveyplate/better-auth-ui'
import api from '../configs/axios'
import { toast} from 'sonner'

const Navbar = () => {
  const[menuOpen , setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const {data: session } = authClient.useSession()   // read about the sessions 
  const [credits , setCredits] = useState(0);

  const getCredits = async()=>{
    try{
      console.log("api call has been made")
      const {data} = await api.get('/api/user/credits');
      setCredits(data.credits)
      console.log(data.credits)
    }catch(e){
      toast.error(e?.response?.data?.message || e.message);
    }
  }

  useEffect(()=>{
    
    if(session?.user){
      getCredits()
      
    }
  },[session?.user])  // once try this with the empty dependency // and check out how everything is mapped like how the req is going and better is handeling different users and all 
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

          <div className=" space-x-3">

{   !session?.user ? (
                <button onClick={()=>navigate(`/auth/signin`)}
            className="active:scale-95 hover:bg-indigo-800 transition px-4 py-2 border border-indigo-600 rounded-md">
              Get started
            </button>
):(
  <>
  <button className='bg-white/10 px-5 py-1.5 text-xs sm:text-sm border text-gray-200 rounded-full '>
    Credits: 
    <span className='text-indigo-300'> {credits}</span>
 </button>
<UserButton size='icon'/>
  </>

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


// import React, { useEffect, useState, useRef } from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
// import logo from '../assets/logo.svg'
// import { authClient } from '../lib/auth-client'
// import {UserButton} from '@daveyplate/better-auth-ui'
// import api from '../configs/axios'
// import { toast } from 'sonner'

// /* ─── Styles ─────────────────────────────────────────────────────────── */
// const STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

//   .nb-root * { box-sizing: border-box; }

//   /* ── Keyframes ── */
//   @keyframes nb-slide-down {
//     from { opacity:0; transform:translateY(-14px); }
//     to   { opacity:1; transform:translateY(0); }
//   }
//   @keyframes nb-fade-in {
//     from { opacity:0; } to { opacity:1; }
//   }
//   @keyframes nb-menu-in {
//     from { opacity:0; transform:scale(.97) translateY(-8px); }
//     to   { opacity:1; transform:scale(1)   translateY(0);    }
//   }
//   @keyframes nb-shimmer {
//     0%   { background-position:200% center; }
//     100% { background-position:-200% center; }
//   }
//   @keyframes nb-credit-glow {
//     0%,100% { box-shadow:0 0 0 0 rgba(124,58,237,0); }
//     50%      { box-shadow:0 0 12px 2px rgba(124,58,237,.35); }
//   }
//   @keyframes nb-mobile-in {
//     from { opacity:0; transform:translateX(100%); }
//     to   { opacity:1; transform:translateX(0); }
//   }
//   @keyframes nb-link-slide {
//     from { opacity:0; transform:translateX(20px); }
//     to   { opacity:1; transform:translateX(0); }
//   }

//   /* ── Navbar shell ── */
//   .nb-bar {
//     font-family:'Outfit',system-ui,sans-serif;
//     position:sticky; top:0; z-index:50;
//     display:flex; align-items:center; justify-content:space-between;
//     padding:0 24px; height:60px;
//     background:rgba(6,1,15,.72);
//     border-bottom:1px solid rgba(139,92,246,.14);
//     backdrop-filter:blur(20px);
//     -webkit-backdrop-filter:blur(20px);
//     animation:nb-slide-down .55s cubic-bezier(.22,1,.36,1) both;
//   }

//   /* inner glow line at bottom */
//   .nb-bar::after {
//     content:'';
//     position:absolute; bottom:0; left:10%; right:10%; height:1px;
//     background:linear-gradient(90deg,transparent,rgba(139,92,246,.35),transparent);
//     pointer-events:none;
//   }

//   /* ── Logo ── */
//   .nb-logo {
//     display:flex; align-items:center;
//     opacity:0; animation:nb-fade-in .5s .1s ease both;
//     text-decoration:none;
//   }
//   .nb-logo img { height:24px; transition:filter .25s, transform .25s; }
//   .nb-logo:hover img { filter:brightness(1.2) drop-shadow(0 0 8px rgba(167,139,250,.5)); transform:scale(1.05); }

//   /* ── Desktop links ── */
//   .nb-links {
//     display:flex; align-items:center; gap:4px;
//     opacity:0; animation:nb-fade-in .5s .2s ease both;
//   }
//   .nb-link {
//     position:relative;
//     padding:6px 14px; border-radius:9px;
//     font-size:14px; font-weight:400; color:rgba(210,200,240,.7);
//     text-decoration:none;
//     transition:color .2s, background .2s;
//   }
//   .nb-link:hover  { color:#e8e0ff; background:rgba(139,92,246,.1); }
//   .nb-link.active { color:#c4b5fd; background:rgba(139,92,246,.14); font-weight:500; }

//   /* animated underline on active */
//   .nb-link.active::after {
//     content:'';
//     position:absolute; bottom:4px; left:14px; right:14px; height:1.5px;
//     background:linear-gradient(90deg,#7c3aed,#a78bfa);
//     border-radius:2px;
//   }

//   /* ── Right section ── */
//   .nb-right {
//     display:flex; align-items:center; gap:10px;
//     opacity:0; animation:nb-fade-in .5s .3s ease both;
//   }

//   /* ── Credits pill ── */
//   .nb-credits {
//     display:inline-flex; align-items:center; gap:6px;
//     padding:5px 14px 5px 10px; border-radius:999px;
//     border:1px solid rgba(139,92,246,.25);
//     background:rgba(14,8,36,.7);
//     font-size:13px; color:rgba(210,200,240,.75);
//     cursor:default; user-select:none;
//     animation:nb-credit-glow 4s ease infinite;
//     transition:border-color .25s;
//   }
//   .nb-credits:hover { border-color:rgba(139,92,246,.5); }
//   .nb-credits-dot {
//     width:7px; height:7px; border-radius:50%;
//     background:#a78bfa;
//     box-shadow:0 0 6px 2px rgba(167,139,250,.5);
//   }
//   .nb-credits-val { color:#c4b5fd; font-weight:600; }

//   /* ── Get started button ── */
//   .nb-cta {
//     position:relative; overflow:hidden;
//     display:inline-flex; align-items:center; gap:7px;
//     padding:8px 20px; border-radius:11px; border:none; cursor:pointer;
//     font-family:'Outfit',sans-serif; font-weight:600; font-size:13.5px;
//     letter-spacing:.02em; color:#fff;
//     background:linear-gradient(135deg,#5b21b6,#7c3aed,#a855f7,#7c3aed,#5b21b6);
//     background-size:300% 100%;
//     animation:nb-shimmer 4s linear infinite;
//     transition:transform .18s, box-shadow .18s;
//   }
//   .nb-cta:hover {
//     transform:translateY(-2px) scale(1.03);
//     box-shadow:0 10px 32px rgba(124,58,237,.45), 0 0 0 1px rgba(167,139,250,.2);
//   }
//   .nb-cta:active { transform:scale(.97); }
//   .nb-cta::after {
//     content:''; position:absolute; inset:0;
//     background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%);
//     background-size:200%; background-position:200%;
//     transition:background-position .45s;
//   }
//   .nb-cta:hover::after { background-position:-200%; }

//   /* ── Hamburger ── */
//   .nb-hamburger {
//     display:flex; align-items:center; justify-content:center;
//     width:38px; height:38px; border-radius:10px; border:none; cursor:pointer;
//     background:rgba(139,92,246,.1); border:1px solid rgba(139,92,246,.2);
//     color:rgba(210,200,240,.8);
//     transition:background .2s, color .2s, transform .2s;
//   }
//   .nb-hamburger:hover { background:rgba(139,92,246,.2); color:#e8e0ff; transform:scale(1.05); }
//   .nb-hamburger:active { transform:scale(.93); }

//   /* ── Mobile overlay ── */
//   .nb-mobile-overlay {
//     position:fixed; inset:0; z-index:100;
//     background:rgba(4,1,12,.92);
//     backdrop-filter:blur(24px);
//     -webkit-backdrop-filter:blur(24px);
//     display:flex; flex-direction:column;
//     animation:nb-mobile-in .35s cubic-bezier(.22,1,.36,1) both;
//   }

//   /* top strip */
//   .nb-mobile-top {
//     display:flex; align-items:center; justify-content:space-between;
//     padding:16px 24px;
//     border-bottom:1px solid rgba(139,92,246,.12);
//   }

//   /* links */
//   .nb-mobile-links {
//     flex:1; display:flex; flex-direction:column;
//     align-items:center; justify-content:center;
//     gap:6px; padding:32px 0;
//   }
//   .nb-mobile-link {
//     font-family:'Outfit',sans-serif; font-weight:500;
//     font-size:clamp(1.1rem,5vw,1.4rem);
//     color:rgba(210,200,240,.7); text-decoration:none;
//     padding:10px 28px; border-radius:14px; width:80%; text-align:center;
//     border:1px solid transparent;
//     transition:color .2s, background .2s, border-color .2s, transform .2s;
//   }
//   .nb-mobile-link:hover, .nb-mobile-link.active {
//     color:#e8e0ff;
//     background:rgba(139,92,246,.1);
//     border-color:rgba(139,92,246,.25);
//     transform:scale(1.02);
//   }

//   /* staggered mobile link animation */
//   .nb-ml-0 { animation:nb-link-slide .4s .05s cubic-bezier(.22,1,.36,1) both; }
//   .nb-ml-1 { animation:nb-link-slide .4s .12s cubic-bezier(.22,1,.36,1) both; }
//   .nb-ml-2 { animation:nb-link-slide .4s .19s cubic-bezier(.22,1,.36,1) both; }
//   .nb-ml-3 { animation:nb-link-slide .4s .26s cubic-bezier(.22,1,.36,1) both; }

//   /* close button */
//   .nb-close {
//     display:flex; align-items:center; justify-content:center;
//     width:42px; height:42px; border-radius:12px; border:none; cursor:pointer;
//     background:rgba(139,92,246,.12); border:1px solid rgba(139,92,246,.22);
//     color:rgba(210,200,240,.8);
//     transition:background .2s, transform .2s;
//   }
//   .nb-close:hover { background:rgba(139,92,246,.24); transform:scale(1.08) rotate(90deg); }

//   /* mobile bottom auth area */
//   .nb-mobile-auth {
//     padding:20px 24px 36px;
//     border-top:1px solid rgba(139,92,246,.1);
//     display:flex; align-items:center; justify-content:center; gap:12px;
//   }

//   /* vertical separator */
//   .nb-sep {
//     width:1px; height:22px;
//     background:rgba(139,92,246,.2);
//   }

//   @media(min-width:1024px) {
//     .nb-mobile-only { display:none !important; }
//   }
//   @media(max-width:1023px) {
//     .nb-desktop-only { display:none !important; }
//   }
// `

// /* ─── Nav links config ───────────────────────────────────────────────── */
// const NAV_LINKS = [
//   { to: '/',          label: 'Home'        },
//   { to: '/projects',  label: 'My Projects' },
//   { to: '/community', label: 'Community'   },
//   { to: '/pricing',   label: 'Pricing'     },
// ]

// /* ─── Navbar ─────────────────────────────────────────────────────────── */
// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [credits, setCredits]   = useState(0)
//   const navigate  = useNavigate()
//   const location  = useLocation()
//   const { data: session } = authClient.useSession()

//   const getCredits = async () => {
//     try {
//       const { data } = await api.get('/api/user/credits')
//       setCredits(data.credits)
//     } catch (e) {
//       toast.error(e?.response?.data?.message || e.message)
//     }
//   }

//   useEffect(() => {
//     if (session?.user) getCredits()
//   }, [session?.user])

//   /* lock body scroll when mobile menu open */
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? 'hidden' : ''
//     return () => { document.body.style.overflow = '' }
//   }, [menuOpen])

//   const isActive = (path) =>
//     path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: STYLES }} />

//       <div className="nb-root">
//         <nav className="nb-bar">

//           {/* Logo */}
//           <Link to="/" className="nb-logo">
//             <img src={logo} alt="logo" />
//           </Link>

//           {/* Desktop links */}
//           <div className="nb-links nb-desktop-only">
//             {NAV_LINKS.map(({ to, label }) => (
//               <Link key={to} to={to} className={`nb-link${isActive(to) ? ' active' : ''}`}>
//                 {label}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop right */}
//           <div className="nb-right nb-desktop-only">
//             {!session?.user ? (
//               <button className="nb-cta" onClick={() => navigate('/auth/signin')}>
//                 Get started
//               </button>
//             ) : (
//               <>
//                 <div className="nb-credits">
//                   <span className="nb-credits-dot" />
//                   Credits:&nbsp;<span className="nb-credits-val">{credits}</span>
//                 </div>
//                 <UserButton size="icon" />
//               </>
//             )}
//           </div>

//           {/* Hamburger */}
//           <button
//             className="nb-hamburger nb-mobile-only"
//             onClick={() => setMenuOpen(true)}
//             aria-label="Open menu"
//           >
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
//             </svg>
//           </button>
//         </nav>

//         {/* ── Mobile menu ── */}
//         {menuOpen && (
//           <div className="nb-mobile-overlay nb-mobile-only">

//             {/* Top bar */}
//             <div className="nb-mobile-top">
//               <Link to="/" className="nb-logo" onClick={() => setMenuOpen(false)}>
//                 <img src={logo} alt="logo" />
//               </Link>
//               <button className="nb-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
//                 </svg>
//               </button>
//             </div>

//             {/* Links */}
//             <div className="nb-mobile-links">
//               {NAV_LINKS.map(({ to, label }, i) => (
//                 <Link
//                   key={to}
//                   to={to}
//                   className={`nb-mobile-link nb-ml-${i}${isActive(to) ? ' active' : ''}`}
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {label}
//                 </Link>
//               ))}
//             </div>

//             {/* Auth area */}
//             <div className="nb-mobile-auth">
//               {!session?.user ? (
//                 <button
//                   className="nb-cta"
//                   style={{ padding:'10px 32px', fontSize:15 }}
//                   onClick={() => { navigate('/auth/signin'); setMenuOpen(false) }}
//                 >
//                   Get started
//                 </button>
//               ) : (
//                 <>
//                   <div className="nb-credits">
//                     <span className="nb-credits-dot" />
//                     Credits:&nbsp;<span className="nb-credits-val">{credits}</span>
//                   </div>
//                   <div className="nb-sep" />
//                   <UserButton size="icon" />
//                 </>
//               )}
//             </div>

//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default Navbar