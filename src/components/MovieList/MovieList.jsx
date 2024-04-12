import { Link, useLocation } from "react-router-dom"
import css from "./MovieList.module.css"


const MovieList = ({ movies }) => {
    const location = useLocation();

  return (
      <div>
          <ul className={css.list}>
              {movies !== null && Array.isArray(movies) &&
                  movies.map(movie => (
                  <li key={movie.id} className={css.item}>
                      <Link state={location} to={`/movies/${movie.id}`}>
                          <h3 className={css.title}>{movie.title}</h3>                      
                      </Link>
                  </li>
                  ))}
              {movies === null && <p>No movies found</p>}
          </ul>
    </div>
  )
}

export default MovieList