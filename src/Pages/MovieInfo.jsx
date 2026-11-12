// import { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";

// const API_KEY = import.meta.env.VITE_API_KEY;

// function MovieInfo() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!id) return;

//     const fetchMovie = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(
//           `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}`,
//         );

//         if (!response.ok) {
//           throw new Error("Unable to connect to the API.");
//         }

//         const data = await response.json();

//         if (data.Response === "False") {
//           throw new Error(data.Error || "Movie not found.");
//         }

//         setMovie(data);
//       } catch (err) {
//         setMovie(null);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovie();
//   }, [id]);

//   if (loading) {
//     return (
//       <main className="main">
//         <p>Loading...</p>
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="main">
//         <div className="movie-details__container">
//           <div className="movie-details__back">
//             <button
//               className="movie-details__back-button"
//               onClick={() => navigate(-1)}
//             >
//               ← Back
//             </button>
//           </div>
//           <p>{error}</p>
//         </div>
//       </main>
//     );
//   }

//   if (!movie) return null;

//   return (
//     <main className="main">
//       <div className="movie-details__container">
//         <div className="movie-details__back">
//           <button
//             className="movie-details__back-button"
//             onClick={() => navigate(-1)}
//           >
//             ← Back
//           </button>
//         </div>

//         <div className="movie-details__content">
//           <div className="movie-details__poster--wrapper">
//             {movie.Poster && movie.Poster !== "N/A" ? (
//               <img
//                 className="movie-details__poster"
//                 src={movie.Poster}
//                 alt={movie.Title}
//               />
//             ) : (
//               <div className="movie-details__poster-placeholder">
//                 Movie Poster Not Available
//               </div>
//             )}

//             <div className="movie-details__info">
//               <h1 className="movie-details__title">{movie.Title}</h1>
//               <p className="movie-details__year">Year: {movie.Year}</p>
//               <p className="movie-details__rating">
//                 Rating: {movie.imdbRating}/10
//               </p>
//               <p className="movie-details__released">
//                 Released: {movie.Released}
//               </p>
//             </div>
//           </div>

//           <div className="movie-details__text--wrapper">
//             <div className="movie-details__detail">
//               <h3>Genre</h3>
//               <p>{movie.Genre}</p>
//             </div>
//             <div className="movie-details__detail">
//               <h3>Writer</h3>
//               <p>{movie.Writer}</p>
//             </div>
//             <div className="movie-details__detail">
//               <h3>Actors</h3>
//               <p>{movie.Actors}</p>
//             </div>
//             <div className="movie-details__detail">
//               <h3>Plot</h3>
//               <p>{movie.Plot}</p>
//             </div>
//             <div className="movie-details__detail">
//               <h3>Language</h3>
//               <p>{movie.Language}</p>
//             </div>
//             <div className="movie-details__detail">
//               <h3>Awards</h3>
//               <p>{movie.Awards}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default MovieInfo;

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
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
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}`
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
    return (
      <main className="main">
        <div className="movie-details__container">
          <div className="movie-details__back">
            <button
              className="movie-details__back-button"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
          <div className="movie-details__content">
            <div className="movie-details__poster--wrapper">
              <div className="movie-details__poster-placeholder skeletal"></div>
              <div className="movie-details__info">
                <h1 className="movie-details__title skeletal"></h1>
                <p className="movie-details__year skeletal"></p>
                <p className="movie-details__rating skeletal"></p>
                <p className="movie-details__released skeletal"></p>
              </div>
            </div>
            <div className="movie-details__text--wrapper">
              <div className="movie-details__detail skeletal"></div>
              <div className="movie-details__detail skeletal"></div>
              <div className="movie-details__detail skeletal"></div>
              <div className="movie-details__detail skeletal"></div>
              <div className="movie-details__detail skeletal"></div>
              <div className="movie-details__detail skeletal"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main">
        <div className="movie-details__container">
          <div className="movie-details__back">
            <button
              className="movie-details__back-button"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!movie) return null;

  return (
    <main className="main">
      <div className="movie-details__container">
        <div className="movie-details__back">
          <button
            className="movie-details__back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <div className="movie-details__content">
          <div className="movie-details__poster--wrapper">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img
                className="movie-details__poster"
                src={movie.Poster}
                alt={movie.Title}
              />
            ) : (
              <div className="movie-details__poster-placeholder">
                Movie Poster Not Available
              </div>
            )}

            <div className="movie-details__info">
              <h1 className="movie-details__title">{movie.Title}</h1>
              <p className="movie-details__year">Year: {movie.Year}</p>
              <p className="movie-details__rating">
                Rating: {movie.imdbRating}/10
              </p>
              <p className="movie-details__released">
                Released: {movie.Released}
              </p>
            </div>
          </div>

          <div className="movie-details__text--wrapper">
            <div className="movie-details__detail">
              <h3>Genre</h3>
              <p>{movie.Genre}</p>
            </div>
            <div className="movie-details__detail">
              <h3>Writer</h3>
              <p>{movie.Writer}</p>
            </div>
            <div className="movie-details__detail">
              <h3>Actors</h3>
              <p>{movie.Actors}</p>
            </div>
            <div className="movie-details__detail">
              <h3>Plot</h3>
              <p>{movie.Plot}</p>
            </div>
            <div className="movie-details__detail">
              <h3>Language</h3>
              <p>{movie.Language}</p>
            </div>
            <div className="movie-details__detail">
              <h3>Awards</h3>
              <p>{movie.Awards}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieInfo;
