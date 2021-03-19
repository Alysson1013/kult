import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/components/Home'
import Header from '../src/components/Header'
import Movie from '../src/components/Movie'

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
