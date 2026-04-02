import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Pricing from './Pages/Pricing'
import Projects from './Pages/Projects'
import MyProjects from './Pages/MyProjects'
import Preview from './Pages/Preview'
import Community from './Pages/Community'
import View from './Pages/View'
import Navbar from './components/Navbar'
import {Toaster , toast} from 'sonner'
import AuthPage from './Pages/auth/AuthPage'
import Settings from './Pages/Settings'

const App = () => {
  const {pathname} = useLocation();
  const hideNav = pathname.startsWith('/projects/') && pathname !== '/projects'
                      || pathname.startsWith('/view/') || pathname.startsWith('/preview/') // see the complete logic and map it
  return (
    <div>
     <Toaster/>
      {!hideNav && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/projects/:projectId' element={<Projects/>}/>
        <Route path='/projects' element={<MyProjects/>}/>
        <Route path='/view/:projectId' element={<View/>}/>
        <Route path='/preview/:projectId' element={<Preview/>}/>
        <Route path='/community' element={<Community/>}/>
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path='/account/settings' element={<Settings/>}/>
      </Routes>
    </div>
  )
}

export default App