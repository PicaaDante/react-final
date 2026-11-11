import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

const API_KEY = import.meta.env.VITE_API_KEY;

function Movies() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const totalPages = Math.ceil(totalResults / 10) || 1;

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
            query,
          )}&page=${page}`,
        );

        if (!response.ok) {
          throw new Error("Unable to connect to the API.");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults) || 0);
      } catch (err) {
        setMovies([]);
        setTotalResults(0);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "title-asc") return a.Title.localeCompare(b.Title);
    if (sortBy === "title-desc") return b.Title.localeCompare(a.Title);
    if (sortBy === "year-asc")
      return (parseInt(a.Year) || 0) - (parseInt(b.Year) || 0);
    if (sortBy === "year-desc")
      return (parseInt(b.Year) || 0) - (parseInt(a.Year) || 0);
    return 0;
  });

  return (
    <main className="main">
      <div className="controls">
        <p>{query ? `Showing: ${query}` : "Search for a movie"}</p>

        {query && (
          <label>
            Sort:{""}
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default</option>
              <option value="title-asc">Title (A–Z)</option>
              <option value="title-desc">Title (Z–A)</option>
              <option value="year-asc">Year (Oldest)</option>
              <option value="year-desc">Year (Newest)</option>
            </select>
          </label>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="movies-grid">
        {sortedMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {query && !loading && !error && totalResults > 0 && (
        <div className="pagination">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}

export default Movies;
