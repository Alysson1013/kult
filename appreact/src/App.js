import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Movie from './components/Movie'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { UserStorage } from './userStorage/userContext'
import Profile from './components/Profile'
import Manage from './components/Manage'
import MovieForm from './components/MovieForm'
import MovieCreate from './components/MovieCreate'

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
          <Route path="profile/:id" element={<Profile />} />
          <Route path="manage" element={<Manage />} />
          <Route path="edit/movie/:id" element={<MovieForm />} /> ]
          <Route path="new/movie" element={<MovieCreate />} />
        </Routes>
      </BrowserRouter>
    </UserStorage>
  );
}

export default App;
