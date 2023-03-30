import React from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Community from "./components/Community";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Login from "./components/Login";

const App = () => {
  console.log('test')
  return(
    <div id="app" className="d-flex flex-row">
      <SideNav />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/community' element={<Community />} />
        <Route path='/settings' element={<Settings />} />

      </Routes>
        
    </div>
  )
};

const container = document.getElementById('root');
const root = createRoot(container)
root.render(<HashRouter>
              <App/>
            </HashRouter>
             );