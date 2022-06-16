import React from "react";
import Movie from "./Movie";
import TopRated from "./TopRated";
import Trending from "./Trending";
import Upcoming from "./Upcoming";

type MovieObject = {
  first_air_date: string;
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  media_type: string;
  name?: string;
};

interface Props {
  searchResult: MovieObject[] | null;
}

const Movies = ({ searchResult }: Props) => {
  return (
    <>
      {searchResult === undefined ? (
        <>
          <Trending />
          <TopRated />
          <Upcoming />
        </>
      ) : (
        <>
          <div className="title">
            <h2>Search Results</h2>
            {searchResult?.length === 0 && <h2>No results found...</h2>}
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
                return "";
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Movies;
