import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const poster = 
  movie.Poster !== "N/A"
  ? movie.Poster
  : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <article>
      <Link to={`/movies/${movie.imdbID}`}>
        <img src={poster} alt={movie.Title} />
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </Link>
    </article>
  )
}

export default MovieCard;