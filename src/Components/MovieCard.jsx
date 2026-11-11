import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <Link to={`/movies/${movie.imdbID}`}>
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img
            className="movie-card__img"
            src={movie.Poster}
            alt={movie.Title}
          />
        ) : (
          <div className="movie-card__poster-placeholder">
            Movie Poster Not Available
          </div>
        )}
        <h2 className="movie-card__title">{movie.Title}</h2>
        <p className="movie-card__year">{movie.Year}</p>
      </Link>
    </article>
  );
}

export default MovieCard;