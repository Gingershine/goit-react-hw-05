import {useParams} from'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { getMovieCast } from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useEffect, useState } from 'react';
import css from './MovieCast.module.css';



const MovieCast = () => {
  
  const { movieId } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieData, setMovieData] = useState(null);

useEffect(() => {
  if (!movieId) return;

  async function fetchData() {
    try {
      setError(false);
      setisLoading(true);
      const response = await getMovieCast(movieId);
      setMovieData(response.cast);     
      
    } catch (error) {
      setError(true);
    }
    finally {
      setisLoading(false);
    }
  }
  fetchData()
}, [movieId]);
  


  return (
    <div className={css.container}>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <ul className={css.cast}>
        {
          movieData &&
        
        movieData.map(el => (
            <li className={css.item} key={el.id}>
              <div className={css.image}>
              <img src={`https://image.tmdb.org/t/p/w200/${el.profile_path}`} alt={el.name} width={100} />
              </div>
              <p className={css.name}>{el.name}</p>
              <p>Character: {el.character}</p>
            </li>
          )) 
        }
</ul>
      

    </div>
  )
}

export default MovieCast 