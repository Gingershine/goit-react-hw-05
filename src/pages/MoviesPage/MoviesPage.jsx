import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar"
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getMovie } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (!searchQuery) return;
    async function fetchData() {
      try {
        setError(false);
        setisLoading(true);        
        const response = await getMovie(searchQuery);
        setMovies(response);
      } catch (error) {
        setError(true);
      }
      finally {
        setisLoading(false);
        
      }
    }
    fetchData();
  }, [searchQuery]);

  const handleSearch = (query) => {
    if (!query.length === 0) {
      alert("Please enter a valid search query");
      return;
    }

    setSearchParams({ query: query });
    
  }


  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <SearchBar onSubmit={handleSearch}
      searchQuery={searchQuery} />
      <MovieList movies={movies} />
    </div>
  )
}

export default MoviesPage