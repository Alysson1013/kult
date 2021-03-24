import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Movie from './components/Movie'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { UserStorage } from './userStorage/userContext'

function App() {
  return (
    <UserStorage>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </UserStorage>
  );
}

export default App;
