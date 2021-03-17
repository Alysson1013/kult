import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from '../src/components/Header' 
import Home from '../src/components/Home' 


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
