import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import ChatHistory from './pages/ChatHistory'
import Profile from './pages/Profile'
import InitChat from './pages/InitChat'
import Loading from './pages/Loading'
import  ChatBox from './pages/ChatBox'
import Preview from './pages/Preview'
import Commit from './pages/Commit'
import SidebarLayout from './components/slidebar'
import './styles/app.css'


export default function App() {
  return (
   
     <div className="app-root">
      <nav className="top-nav">
        <div className="nav-left">Repo-AI</div>
        <div className="nav-links">
          
          <Link to="/login">Login</Link>
          <Link to="/home">Home</Link>
          <Link to="/chat-history">Chat History</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/init-chat">Init Chat</Link>
         <Link to="/loading">Loading</Link> 
          <Link to="/chat-box">Chat Box</Link>
          <Link to="/preview">Preview</Link>
          <Link to="/commit">Commit</Link>
          
        </div>
      </nav>

      <main className="main-area">
        <Routes>
           {/* Routes without sidebar */}
       <Route path="/login" element={<Login />} />
      <Route path="/loading" element={<Loading />} />
     
      
      {/* Routes with sidebar */}
      <Route path="/home" element={<SidebarLayout><Home /></SidebarLayout>} />
      <Route path="/chat-history" element={<SidebarLayout><ChatHistory /></SidebarLayout>} />
      <Route path="/init-chat" element={<SidebarLayout><InitChat /></SidebarLayout>} />
      <Route path="/profile" element={<SidebarLayout><Profile /></SidebarLayout>} />
      <Route path="/chat-box" element={<SidebarLayout><ChatBox /></SidebarLayout>} />
      <Route path="/preview" element={<SidebarLayout><Preview /></SidebarLayout>} />
      <Route path="/commit" element={<SidebarLayout><Commit /></SidebarLayout>} />
        </Routes>
      </main>
    </div>
  
  )
}