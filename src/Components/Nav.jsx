import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fesLogo from "../assets/fes-logo.png";
import searchIcon from "../assets/search-icon.png";

function Nav() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const q = search.trim();
    if (!q) return;
    navigate(`/movies?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <img className="logo__img" src={fesLogo} alt="" />
        <h4 className="logo__title">
          <span>Simplified</span> Flix
        </h4>
      </Link>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__group">
          <input
            className="search-form__input"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search movies..."
          />
          <button
            className="search-form__button"
            type="submit"
            aria-label="Search"
          >
            <img className="search-form__icon" src={searchIcon} alt="" />
          </button>
        </div>
      </form>
    </nav>
  );
}

export default Nav;
