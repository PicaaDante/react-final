import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="main">
      <h1>Welcome to my Movie App</h1>
      <p>Search for movies and view their details.</p>
      <Link to="/movies?q=Avengers">Browse Movies</Link>
    </main>
  );
}

export default Home;
