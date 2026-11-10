import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}`,
        );

        if (!response.ok) {
          throw new Error("Unable to connect to the API.");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Movie not found.");
        }

        setMovie(data);
      } catch (err) {
        setMovie(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <main>
        <Link to="/movies">Back to Search</Link>
        <p>{error}</p>
      </main>
    );
  }

  if (!movie) {
    return null;
  }

  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <main>
      <Link to="/movies">Back to Search</Link>
      <h1>{movie.Title}</h1>
      <img src={poster} alt={movie.Title} />
      <p>{movie.Year}</p>
      <p>{movie.Plot}</p>
      <p>
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Rated:</strong> {movie.Rated}
      </p>
      <p>
        <strong>Runtime:</strong> {movie.Runtime}
      </p>
      <p>
        <strong>IMDB:</strong> {movie.imdbRating}
      </p>
    </main>
  );
}

export default MovieInfo;
