import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { getMovieReviews } from "../../services/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);

 
  useEffect(() => {
    if (!movieId) return;
    async function fetchData() {
      try {
        setError(false);
        setisLoading(true);
        const response = await getMovieReviews(movieId);
        setReviews(response);
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
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews for this movie</p>
      )}
    </div>
  )
}

export default MovieReviews