import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Movie from "./Movie";

type MovieObject = {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  original_name?: string;
  first_air_date?: string;
};

type SeriesObject = {
  id: number;
  original_name: string;
  poster_path: string;
  first_air_date: string;
  release_date?: string;
  original_title?: string;
};

const TopRated = () => {
  const [movies, setMovies] = useState<MovieObject[] | SeriesObject[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    if (pathname === "/movies") {
      const fetchData = async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=ea80ce78e4b606f4ea1fa566979b561f&language=en-US&page=1"
        );
        const data = await response.json();
        const trending = await data.results;
        setMovies(trending);
        setLoading(false);
      };
      fetchData();
    }
    if (pathname === "/series") {
      const fetchData = async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=ea80ce78e4b606f4ea1fa566979b561f&language=en-US&page=1"
        );
        const data = await response.json();
        const trending = await data.results;
        setMovies(trending);
        setLoading(false);
      };
      fetchData();
    }
  }, [pathname]);

  return (
    <>
      <div className="title">
        {loading && <LoadingSpinner />}
        <h2>Top Rated {pathname === "/movies" ? "Movies" : "Series"}</h2>
      </div>
      <div className="movieContainer">
        {pathname === "/movies" &&
          movies?.map((movie) => {
            return (
              <Movie
                key={movie.id}
                original_title={movie.original_title!}
                poster_path={movie.poster_path}
                release_date={movie.release_date!}
                id={movie.id}
              />
            );
          })}
        {pathname === "/series" &&
          movies?.map((movie) => {
            return (
              <Movie
                key={movie.id}
                original_title={movie.original_name!}
                poster_path={movie.poster_path}
                release_date={movie.first_air_date!}
                id={movie.id}
                first_air_date={true}
              />
            );
          })}
      </div>
    </>
  );
};

export default TopRated;
