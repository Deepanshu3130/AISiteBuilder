// import React, { useState } from 'react'
// import instagram from "../assets/instagram.svg"
// import netflix from "../assets/netflix.svg"
// import hostinger from "../assets/hostinger.svg"
// import vercel from "../assets/vercel.svg"
// import youtube from "../assets/youtube.svg"
// import {Loader2Icon} from 'lucide-react'
// import { authClient } from '../lib/auth-client'
// import { toast} from 'sonner'
// import api from '../configs/axios'
// import { useNavigate } from 'react-router-dom'


// function Home() {
//   const [input, setInput] = useState();
//   const[loading , setLoading] = useState(false)
//   const {data : session} = authClient.useSession();
//   const navigate = useNavigate()


//   const onSubmitHandler = async(e)=>{
//      e.preventDefault();
//      try{
//       if(!session?.user){
//         return toast.error('please sign in to create a project')
//       }else if(!input.trim()){
//         return toast.error('please enter a message')
//       }
//       setLoading(true);

//       const {data} = await api.post('/api/user/project' ,
//         {
//           initial_prompt : input
//         }
//       )
//       setLoading(false)
//       navigate(`/projects/${data.projectId}`)
//      }catch(e){
//       setLoading(false);
//       toast.error(e?.response?.data?.message || e.message);
//      }
//   }


//   return (

//     <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex flex-col items-center justify-center text-white px-4">

//       {/* Top Badge */}
//       <div className="border border-purple-500/30 rounded-full flex items-center gap-2 px-3 py-1 mb-8">
//         <span className="bg-purple-600 px-2 py-0.5 rounded-md text-xs">
//           NEW
//         </span>
//         <span className="text-sm opacity-80">
//           Try 30 days free trial option
//         </span>
//       </div>

//       {/* Heading Section */}
//       <div className="max-w-4xl text-center space-y-4">
//         <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
//           Turn thoughts into websites instantly, with AI.
//         </h1>

//         <p className="text-gray-300 max-w-xl mx-auto">
//           Create, customize and present faster than ever with intelligent
//           design powered by AI.
//         </p>
//       </div>

//       {/* Input Section */}
//           <form onSubmit={onSubmitHandler}
//           className="bg-white/10 max-w-2xl w-full rounded-xl p-4 mt-10 border border-indigo-600/70 focus-within:ring-2 ring-indigo-500 transition-all">
//           <textarea onChange={e => setInput(e.target.value)} value={input} className="bg-transparent outline-none text-gray-300 resize-none w-full" rows={4} placeholder="Describe your presentation in details" required />
//           <button className="ml-auto flex items-center gap-2 bg-gradient-to-r from-[#CB52D4] to-indigo-600 rounded-md px-4 py-2">
//             {loading ? (
//               <>
//                 Creating <Loader2Icon className="animate-spin size-4 text-white"/>
//               </>
//              ):("Create with AI") }
//           </button>
//         </form>

//         <div className="flex flex-wrap items-center justify-center gap-16 mx-auto mt-16">
//           <div className="w-full  mx-auto flex flex-wrap justify-center items-center gap-16 mt-16">
//             <img className="h-18 md:h-20" src={instagram} />
//             <img className="h-18 md:h-20" src={netflix} />
//             <img className="h-18 md:h-20" src={vercel} />
//             <img className="h-18 md:h-20" src={hostinger} />
//             <img className="h-18 md:h-20" src={youtube} />
//             <img className="h-18 md:h-20" src={youtube} />
//             <img className="h-18 md:h-20" src={youtube} />
//             <img className="h-18 md:h-20" src={youtube} />
//          </div>

//         </div>

//     </div>
//   )
// }

// export default Home


import React, { useState, useRef } from 'react'
import { Loader2Icon } from 'lucide-react'
import { authClient } from '../lib/auth-client'
import { toast } from 'sonner'
import api from '../configs/axios'
import { useNavigate } from 'react-router-dom'

/* ─── All styles in one injected block ──────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --bg:       #06010f;
    --surface:  rgba(14,8,36,0.75);
    --border:   rgba(139,92,246,0.2);
    --glow:     #7c3aed;
    --accent:   #a78bfa;
    --text:     #ede8f8;
    --muted:    rgba(167,139,250,0.38);
  }

  /* ── Keyframes ── */
  @keyframes orb-float {
    0%,100% { transform: translate(0,0) scale(1);        }
    33%      { transform: translate(50px,-70px) scale(1.1); }
    66%      { transform: translate(-35px,30px) scale(0.93); }
  }
  @keyframes grain-shift {
    0%,100% { transform:translate(0,0); }
    20%     { transform:translate(-3%,-2%); }
    40%     { transform:translate(2%,3%); }
    60%     { transform:translate(-1%,4%); }
    80%     { transform:translate(3%,-1%); }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes badge-pulse {
    0%,100% { box-shadow:0 0 0 0 rgba(124,58,237,0);    }
    50%      { box-shadow:0 0 24px 4px rgba(124,58,237,.3); }
  }
  @keyframes underline-in {
    from { width:0; } to { width:100%; }
  }
  @keyframes btn-flow {
    0%   { background-position:0%   50%; }
    100% { background-position:200% 50%; }
  }
  @keyframes spark-up {
    0%   { opacity:0; transform:translateY(0) scale(.5);  }
    15%  { opacity:1; }
    100% { opacity:0; transform:translateY(-70px) scale(1.3); }
  }
  @keyframes ring-out {
    0%   { transform:scale(1);   opacity:.55; }
    100% { transform:scale(2.4); opacity:0;   }
  }

  /* ── Utility ── */
  .ds-body    { font-family:'Outfit',system-ui,sans-serif; }
  .ds-display { font-family:'Instrument Serif',Georgia,serif; }

  .fade-up    { animation: fade-up .65s cubic-bezier(.22,1,.36,1) both; }
  .d1 { animation-delay:.05s; }
  .d2 { animation-delay:.18s; }
  .d3 { animation-delay:.34s; }
  .d4 { animation-delay:.52s; }
  .d5 { animation-delay:.70s; }

  /* ── Grid bg ── */
  .ds-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image:
      linear-gradient(rgba(139,92,246,.045) 1px, transparent 1px),
      linear-gradient(90deg,rgba(139,92,246,.045) 1px, transparent 1px);
    background-size:68px 68px;
  }

  /* ── Grain ── */
  .ds-grain {
    position:absolute; inset:0; pointer-events:none; opacity:.032;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)'/%3E%3C/svg%3E") repeat;
    background-size:200px;
    animation:grain-shift 7s steps(1) infinite;
  }

  /* ── Orbs ── */
  .ds-orb {
    position:absolute; border-radius:50%; pointer-events:none;
    filter:blur(85px);
    animation:orb-float linear infinite;
  }

  /* ── Badge ── */
  .ds-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:5px 16px 5px 8px; border-radius:999px;
    border:1px solid rgba(139,92,246,.28);
    background:rgba(124,58,237,.08);
    backdrop-filter:blur(14px);
    animation:badge-pulse 3.5s ease infinite;
    cursor:default; user-select:none;
  }
  .ds-badge-dot {
    width:8px; height:8px; border-radius:50%;
    background:#a78bfa;
    box-shadow:0 0 8px 3px rgba(167,139,250,.5);
  }
  .ds-badge-new {
    font-family:'Outfit',sans-serif; font-size:10px; font-weight:700;
    letter-spacing:.1em; text-transform:uppercase;
    background:rgba(124,58,237,.65); color:#e8e0ff;
    padding:2px 7px; border-radius:5px;
  }

  /* ── Italic accent with underline ── */
  .ds-italic-accent {
    color:#c4b5fd; font-style:italic; position:relative; display:inline;
  }
  .ds-italic-accent::after {
    content:''; position:absolute;
    bottom:-5px; left:0; height:2px; border-radius:2px;
    background:linear-gradient(90deg,#7c3aed,#a78bfa,#c4b5fd);
    animation:underline-in 1.1s cubic-bezier(.22,1,.36,1) .9s both;
  }

  /* ── Textarea card ── */
  .ds-card {
    position:relative; border-radius:20px; overflow:hidden;
    background:var(--surface);
    border:1px solid var(--border);
    backdrop-filter:blur(22px);
    transition:border-color .3s, box-shadow .3s;
  }
  .ds-card::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:radial-gradient(ellipse 70% 40% at 50% 0%, rgba(124,58,237,.06) 0%, transparent 70%);
  }
  .ds-card.is-focused {
    border-color:rgba(139,92,246,.55);
    box-shadow:0 0 0 3px rgba(124,58,237,.11), 0 24px 70px rgba(124,58,237,.13);
  }
  .ds-card-topbar {
    display:flex; align-items:center; gap:6px;
    padding:14px 18px 0 18px;
  }
  .ds-mac-dot { width:10px; height:10px; border-radius:50%; }

  .ds-textarea {
    display:block; width:100%; border:none; resize:none;
    background:transparent; color:var(--text);
    font-family:'Outfit',sans-serif; font-size:15px; line-height:1.72;
    caret-color:#a78bfa;
    padding:16px 20px 8px;
  }
  .ds-textarea::placeholder { color:rgba(167,139,250,.25); }
  .ds-textarea:focus        { outline:none; }

  /* ── Char progress ── */
  .ds-track  { height:2px; border-radius:2px; background:rgba(139,92,246,.1); }
  .ds-fill   { height:100%; border-radius:2px; background:linear-gradient(90deg,#7c3aed,#a78bfa); transition:width .3s; }

  /* ── Submit button ── */
  .ds-btn {
    position:relative; overflow:hidden;
    display:inline-flex; align-items:center; gap:8px;
    padding:11px 26px; border-radius:13px; border:none; cursor:pointer;
    font-family:'Outfit',sans-serif; font-weight:600; font-size:14px;
    letter-spacing:.025em; color:#fff;
    background:linear-gradient(135deg,#5b21b6,#7c3aed,#a855f7,#7c3aed,#5b21b6);
    background-size:300% 100%;
    animation:btn-flow 3.5s linear infinite;
    transition:transform .18s, box-shadow .18s;
  }
  .ds-btn::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%);
    background-size:200%;
    background-position:200%;
    transition:background-position .45s;
  }
  .ds-btn:hover { transform:translateY(-2px) scale(1.025); box-shadow:0 14px 44px rgba(124,58,237,.48), 0 0 0 1px rgba(167,139,250,.25); }
  .ds-btn:hover::after { background-position:-200%; }
  .ds-btn:active { transform:scale(.97); }
  .ds-btn:disabled { opacity:.58; cursor:not-allowed; transform:none; animation:none; }

  /* ── Sparks ── */
  .ds-spark {
    position:absolute; width:3px; height:3px; border-radius:50%;
    background:#c4b5fd; pointer-events:none;
    animation:spark-up .9s ease-out forwards;
  }

  /* ── Stat pills ── */
  .ds-pill {
    display:flex; align-items:center; gap:11px;
    padding:11px 18px; border-radius:15px;
    border:1px solid rgba(139,92,246,.14);
    background:rgba(14,8,36,.55); backdrop-filter:blur(14px);
    cursor:default; user-select:none;
    transition:border-color .25s, transform .25s, background .25s;
  }
  .ds-pill:hover {
    border-color:rgba(139,92,246,.4);
    transform:translateY(-4px);
    background:rgba(124,58,237,.11);
  }
  .ds-pill-icon {
    width:36px; height:36px; border-radius:11px; flex-shrink:0;
    background:rgba(124,58,237,.18);
    display:flex; align-items:center; justify-content:center; font-size:17px;
  }
`

/* ─── Orb helper ─────────────────────────────────────────────────────── */
const Orb = ({ w, h, top, left, right, bottom, color, dur, delay }) => (
  <div className="ds-orb" style={{
    width: w, height: h, top, left, right, bottom,
    background: color,
    animationDuration: dur || '15s',
    animationDelay: delay || '0s',
  }} />
)

/* ─── Home ───────────────────────────────────────────────────────────── */
function Home() {
  const [input, setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const [sparks, setSparks]   = useState([])
  const btnRef = useRef(null)

  const { data: session } = authClient.useSession()
  const navigate = useNavigate()

  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (!session?.user)    return toast.error('please sign in to create a project')
      if (!input.trim())     return toast.error('please enter a message')
      setLoading(true)
      const { data } = await api.post('/api/user/project', { initial_prompt: input })
      setLoading(false)
      navigate(`/projects/${data.projectId}`)
    } catch (err) {
      setLoading(false)
      toast.error(err?.response?.data?.message || err.message)
    }
  }

  /* ── spark burst ── */
  const burstSparks = () => {
    const next = Array.from({ length: 7 }, (_, i) => ({
      id: Date.now() + i,
      left:  `${15 + Math.random() * 70}%`,
      bottom:'100%',
      animationDelay: `${i * 0.06}s`,
    }))
    setSparks(next)
    setTimeout(() => setSparks([]), 1100)
  }

  const MAX = 500
  const pct = Math.min((input.length / MAX) * 100, 100)

  const pills = [
    { icon: '⚡', label: 'Instant generation', sub: 'Live in seconds'      },
    { icon: '✦',  label: 'AI-powered design',  sub: 'Pixel-perfect output' },
    { icon: '↗',  label: 'One-click deploy',   sub: 'Ship immediately'     },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="ds-body" style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '64px 20px', position: 'relative', overflow: 'hidden',
        color: 'var(--text)',
      }}>

        {/* ── Layers ── */}
        <div className="ds-grid" />
        <div className="ds-grain" />

        <Orb w={620} h={620} top="-14%" left="-14%"
          color="radial-gradient(circle at 38% 38%, rgba(109,40,217,.48), rgba(124,58,237,.1) 52%, transparent 70%)"
          dur="17s" />
        <Orb w={520} h={520} bottom="-10%" right="-10%"
          color="radial-gradient(circle at 60% 62%, rgba(139,92,246,.36), rgba(99,102,241,.1) 55%, transparent 70%)"
          dur="13s" delay="4s" />
        <Orb w={300} h={300} top="38%" left="58%"
          color="radial-gradient(circle, rgba(167,139,250,.18), transparent 68%)"
          dur="11s" delay="2s" />

        {/* ── Content ── */}
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:660, display:'flex', flexDirection:'column', alignItems:'center' }}>

          {/* Badge */}
          <div className="ds-badge fade-up d1" style={{ marginBottom:36 }}>
            <span className="ds-badge-dot" />
            <span className="ds-badge-new">New</span>
            <span style={{ fontSize:13, color:'var(--accent)', fontWeight:400 }}>
              Try 30 days free trial option
            </span>
          </div>

          {/* Headline */}
          <h1 className="ds-display fade-up d2" style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4.3rem)', fontWeight:400, fontStyle:'normal',
            lineHeight:1.1, textAlign:'center', letterSpacing:'-.022em',
            marginBottom:20, color:'#f2ecff',
          }}>
            Turn thoughts into{' '}
            <span className="ds-italic-accent">websites instantly</span>
            {' '}with AI.
          </h1>

          {/* Subheading */}
          <p className="fade-up d3" style={{
            fontSize:16, lineHeight:1.75, textAlign:'center',
            color:'var(--muted)', maxWidth:430, marginBottom:46,
          }}>
            Create, customize and ship faster than ever — intelligent
            design that thinks with you.
          </p>

          {/* ── Form ── */}
          <form onSubmit={onSubmitHandler} style={{ width:'100%' }} className="fade-up d4">
            <div className={`ds-card${focused ? ' is-focused' : ''}`}>

              {/* macOS-style dots */}
              <div className="ds-card-topbar">
                <div className="ds-mac-dot" style={{ background:'#ff5f56' }} />
                <div className="ds-mac-dot" style={{ background:'#ffbd2e' }} />
                <div className="ds-mac-dot" style={{ background:'#27c93f' }} />
                <span style={{ marginLeft:'auto', fontSize:11, color:'var(--muted)', letterSpacing:'.06em' }}>
                  AI BUILDER
                </span>
              </div>

              <textarea
                className="ds-textarea"
                value={input}
                onChange={e => setInput(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                rows={5}
                placeholder="Describe your website — layout, features, colors, tone…"
                required
              />

              {/* Progress bar */}
              <div style={{ padding:'2px 20px 8px' }}>
                <div className="ds-track"><div className="ds-fill" style={{ width:`${pct}%` }} /></div>
              </div>

              {/* Footer row */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 20px 18px' }}>
                <span style={{ fontSize:12, color:'var(--muted)' }}>{input.length} / {MAX}</span>

                {/* Button + spark container */}
                <div style={{ position:'relative' }}>
                  {sparks.map(s => (
                    <div key={s.id} className="ds-spark" style={{ left:s.left, bottom:s.bottom, animationDelay:s.animationDelay }} />
                  ))}
                  <button
                    ref={btnRef}
                    className="ds-btn"
                    onClick={burstSparks}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2Icon style={{ width:16, height:16 }} className="animate-spin" />
                        Creating…
                      </>
                    ) : (
                      <>
                        {/* lightning bolt icon */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                        Create with AI
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* ── Stat pills ── */}
          <div className="fade-up d5" style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center', marginTop:44 }}>
            {pills.map(({ icon, label, sub }) => (
              <div key={label} className="ds-pill">
                <div className="ds-pill-icon">{icon}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#ede8f8' }}>{label}</div>
                  <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default Home