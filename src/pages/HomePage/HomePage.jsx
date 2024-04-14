import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import { getTrending } from "../../services/api";

const HomePage = () => {

const [isLoading, setisLoading] = useState(false);
const [movies, setMovies] = useState([]);
const [error, setError] = useState(false);
  
  useEffect(() => {
     async function fetchData() {
      try {
        setError(false);
        setisLoading(true);
        const response = await getTrending();
        setMovies(response);
      } catch (error) {
        setError(true);
      }
      finally {
        setisLoading(false);
      }
    }
    fetchData();
    
  }, []);
  
  
  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  )
}

export default HomePage