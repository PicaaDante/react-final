import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>Welcome to my Movie App</h1>
      <p>Search for movies and view their details.</p>
      <Link to="/movies">Browse Movies</Link>
    </main>
  );
}

export default Home;