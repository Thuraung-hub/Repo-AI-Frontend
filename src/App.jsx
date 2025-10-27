import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Loading from './pages/Loading'
import Login from './pages/Login'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Profile from './pages/ProfilePage'
import InitChat from './pages/InitChat'
import Refactor from './pages/Refactor'
import Preview from './pages/Preview'
import Commit from './pages/Commit'
import SidebarLayout from './components/SidebarLayout'
import './styles/app.css'
import ProfilePage from './pages/ProfilePage'
import "./index.css"; 

export default function App() {
  return (
    <div className="app-root">
      
      <main className="main-area">
        <Routes>
           {/* Routes without sidebar */}
      <Route path="/" element={<Loading />} />
        <Route path="/profile" element={<ProfilePage />} />
      <Route path="/sidebar" element={<SidebarLayout />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      
      {/* Routes with sidebar */}
      <Route path="/home" element={<SidebarLayout><Home /></SidebarLayout>} />
      <Route path="/chat" element={<SidebarLayout><Chat /></SidebarLayout>} />
      <Route path="/init-chat" element={<SidebarLayout><InitChat /></SidebarLayout>} />
      <Route path="/profile" element={<SidebarLayout><Profile /></SidebarLayout>} />
      <Route path="/refactor" element={<SidebarLayout><Refactor /></SidebarLayout>} />
      <Route path="/preview" element={<SidebarLayout><Preview /></SidebarLayout>} />
      <Route path="/commit" element={<SidebarLayout><Commit /></SidebarLayout>} />
        </Routes>
      </main>
    </div>
  )
}
