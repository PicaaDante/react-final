import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import MovieInfo from "../Pages/MovieInfo";
import Footer from "./Footer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieInfo />} />
        <Route path="*" element={<Footer />} />
      </Route>
    </Routes>
  );
}

export default App;