import React, { useContext, useEffect, useState } from "react";
import Movie from "./components/Movie";
import Nav from "./components/Nav";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Movies from "./components/Movies";
import { ThemeContext } from "./components/ThemeContext";

type MovieObject = {
  first_air_date: string;
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  media_type: string;
  name?: string;
};

function App() {
  const [movies, setMovies] = useState<MovieObject[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string | null>("");
  const [searchResult, setSearchResult] = useState<MovieObject[] | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  //STATES

  const ctx = useContext(ThemeContext);
  //Context

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=ea80ce78e4b606f4ea1fa566979b561f"
      );
      const data = await response.json();
      const trending = await data.results;
      setMovies(trending);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`
    https://api.themoviedb.org/3/search/multi?api_key=ea80ce78e4b606f4ea1fa566979b561f&language=en-US&query=${search}&page=1&include_adult=false`);
      const data = await response.json();
      const results = await data.results;
      setSearchResult(results);
    };
    fetchData();
  }, [search]);
  //EFFECTS

  //STYLE KOBAS
  let style = darkMode
    ? {
        backgroundColor: ctx.dark.backgroundColor,
        color: ctx.dark.color,
      }
    : {
        backgroundColor: ctx.light.backgroundColor,
        color: ctx.light.color,
      };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <Nav setSearch={setSearch} setDarkMode={setDarkMode} />
                <div className="colorContain" style={style}>
                  <div className="title">
                    <h2>
                      {search?.length !== 0 ? "Search Results" : "Trending"}
                    </h2>
                    {searchResult?.length === 0 && <h2>No results found...</h2>}
                  </div>
                  {!loading && movies && !searchResult ? (
                    <div className="movieContainer">
                      {movies.map((movie) => {
                        return (
                          <Movie
                            key={movie.id}
                            original_title={movie.original_title}
                            poster_path={movie.poster_path}
                            release_date={movie.release_date}
                            id={movie.id}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="movieContainer">
                      {searchResult?.map((movie) => {
                        if (movie.media_type === "movie") {
                          return (
                            <Movie
                              key={movie.id}
                              original_title={movie.original_title}
                              poster_path={movie.poster_path}
                              release_date={movie.release_date}
                              id={movie.id}
                            />
                          );
                        }
                        if (movie.media_type === "tv") {
                          return (
                            <Movie
                              key={movie.id}
                              original_title={movie.name}
                              poster_path={movie.poster_path}
                              release_date={movie.first_air_date}
                              id={movie.id}
                            />
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              </div>
            }
          />
          <Route
            path="/movies"
            element={
              <div className="container">
                <Nav setSearch={setSearch} setDarkMode={setDarkMode} />
                <div className="colorContain" style={style}>
                  <Movies searchResult={searchResult} />
                </div>
              </div>
            }
          />
          <Route
            path="/series"
            element={
              <div className="container">
                <Nav setSearch={setSearch} setDarkMode={setDarkMode} />
                <div className="colorContain" style={style}>
                  <Movies searchResult={searchResult} />
                </div>
              </div>
            }
          />
          <Route
            path="/show/:id"
            element={
              <div className="container">
                <Nav setSearch={setSearch} setDarkMode={setDarkMode} />
                <div className="colorContain" style={style}>
                  <MovieDetail />
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
