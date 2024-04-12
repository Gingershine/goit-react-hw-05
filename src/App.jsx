// import { useState } from 'react'

import { Suspense } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Loader from './components/Loader/Loader'
import MovieCast from './components/MovieCast/MovieCast '
import MovieReviews from './components/MovieReviews/MovieReviews'
import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'


const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))



function App() {
   

  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
     </Suspense>
    </>
  )
}

export default App
