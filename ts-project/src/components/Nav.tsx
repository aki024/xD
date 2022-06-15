import React, { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../kisspng-art-film-logo-cinema-clip-art-movie-logo-cliparts-5ab587fb2edc64.812960291521846267192.png";
import DarkModeButton from "./DarkModeButton";

interface Props {
  setSearch: Dispatch<SetStateAction<string | null>>;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const Nav = ({ setSearch, setDarkMode }: Props) => {
  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="navHeader">
      <div className="navLeft">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="site logo" onClick={scrollToTopHandler} />
          </Link>
        </div>
        <div className="search">
          <div className="searchIcon">
            <FaSearch />
          </div>
          <input
            type="text"
            className="searchInput"
            placeholder="Search for a movie or series..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="navRight">
        <nav className="nav">
          <ul>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "link-active" : "link")}
              onClick={scrollToTopHandler}>
              Trending
            </NavLink>
            <NavLink
              to={"/movies"}
              onClick={scrollToTopHandler}
              className={({ isActive }) => (isActive ? "link-active" : "link")}>
              Movies
            </NavLink>
            <NavLink
              to={"/series"}
              onClick={scrollToTopHandler}
              className={({ isActive }) => (isActive ? "link-active" : "link")}>
              Series
            </NavLink>
            <DarkModeButton setDarkMode={setDarkMode} />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
