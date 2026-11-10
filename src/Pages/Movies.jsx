import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";

const API_KEY = import.meta.env.VITE_API_KEY;

function Movies() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const totalPages = Math.ceil(totalResults / 10) || 1;

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
            query,
          )}&page=${page}`,
        );

        const data = await response.json();

        if (!response.ok || data.Response === "False") {
          throw new Error(
            `${data.Error || "Request failed"} (HTTP ${response.status})`,
          );
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
    if (sortBy === "title-asc") {
      return a.Title.localeCompare(b.Title);
    }
    if (sortBy === "title-desc") {
      return b.Title.localeCompare(a.Title);
    }
    if (sortBy === "year-asc") {
      return (parseInt(a.Year) || 0) - (parseInt(b.Year) || 0);
    }
    if (sortBy === "year-desc") {
      return (parseInt(b.Year) || 0) - (parseInt(a.Year) || 0);
    }
    return 0;
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;

    setPage(1);
    setQuery(trimmedSearch);
  };

  return (
    <main>
      <h1>Movie Search</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>

      {query && (
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort</option>
          <option value="title-asc">Title (A–Z)</option>
          <option value="title-desc">Title (Z–A)</option>
          <option value="year-asc">Year (Oldest)</option>
          <option value="year-desc">Year (Newest)</option>
        </select>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {sortedMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {query && !loading && !error && totalResults > 0 && (
        <div>
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
