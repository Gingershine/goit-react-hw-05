import axios from 'axios';

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTdlZmU2ZWZjNDMwYWJiZjY2NDk1ODY1MDRkMGEyOCIsInN1YiI6IjY2MTdkMThmOTBiODdlMDE3YzNkZGJjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jR_y9d20VHjuXy2kSuE1oJa4_vbkNVaDSijTA4epF0c",
  },
};

const getTrending = async () => {
  const response = await axios.get("trending/movie/day", options);
  return response.data.results;
};

const getMovie = async (query) => {
  const response = await axios.get(`search/movie?query=${query}`, options);
  return response.data.results;
};

const getMovieDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
};

const getMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data;
};

const getMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data.results;
};

export { getTrending, getMovie, getMovieDetails, getMovieCast, getMovieReviews };