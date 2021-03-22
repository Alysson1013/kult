import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Movie from './components/Movie'
import Signup from './components/Signup'

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
