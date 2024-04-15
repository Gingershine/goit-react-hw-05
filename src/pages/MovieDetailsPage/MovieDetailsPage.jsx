import { Link, useParams, useLocation, NavLink } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { getMovieDetails } from "../../services/api";


import { Routes, Route } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast '))
const Loader = lazy(() => import('../../components/Loader/Loader'))
const ErrorMessage = lazy(() => import('../../components/ErrorMessage/ErrorMessage'))
const MovieReviews = lazy(() => import("../../components/MovieReviews/MovieReviews"))

const MovieDetailsPage = () => {

  const {movieId} = useParams();
  const [isLoading, setisLoading] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");
  
  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

  useEffect(() => {
    if (!movieId) return;
    async function fetchData() {
      try {
        setError(false);
        setisLoading(true);
        const response = await getMovieDetails(movieId);
        setMovieData(response);  
              
      } catch (error) {
        setError(true);
      }
      finally {
        setisLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      {movieData !== null && (
        <div>
          <Link to={backLinkRef.current}>Go back</Link><br />
          <img src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : `${defaultImg}` } alt={movieData.title} width={300}/>
           <div>
            <h2>{`${movieData.title} (${movieData.release_date.slice(0, 4)})`}</h2>            
            <h3>Overview</h3>
            <p>{`${movieData.overview}`}</p>
            <h3>Genres</h3>
            <p>
              {movieData.genres.map(genre => (
                <span key={genre.id}>{genre.name}  </span>
              ))}
            </p>
      </div>
        </div>
      )}  
      <div>
        <h3>Additional information</h3>
        <ul className={css.list}>
          <li >
            <NavLink className={css.item} to="cast" >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className={css.item} to="reviews" >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast movieId={movieId} />} />
          <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
        </Routes>
      </Suspense>      
      </div>
  );
}

export default MovieDetailsPage