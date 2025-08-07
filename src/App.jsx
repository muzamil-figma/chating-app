import { useState } from 'react'
import './App.css'
import Home from "./pages/Home";
import NextPage from "./pages/NextPage";
function App() {
const path = window.location.pathname;
  if (path === "/next") return <NextPage />;
  return <Home />;


  return (
    <>
     <Home/>
    </> 
  )
}

export default App
