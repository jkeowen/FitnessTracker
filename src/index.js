import React from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

const App = () => {
  console.log('test')
  return(
    <div id="app" className="d-flex flex-row">
      <SideNav />
      <Register />
      {/* <Dashboard /> */}
    </div>
  )
};

const container = document.getElementById('root');
const root = createRoot(container)
root.render(<HashRouter>
              <App/>
            </HashRouter>
             );