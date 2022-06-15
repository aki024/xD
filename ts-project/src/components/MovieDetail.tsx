import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

type MovieObject = {
  background: string;
  title: string;
  poster: string;
  release: string;
  rating: number;
  tagline: string;
  overview: string;
  genre: string[];
  imdb: string;
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieObject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const sliced = id?.slice(0, id.length - 3);

    setLoading(true);

    if (!id?.includes("tv")) {
      const fetchMovie = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=ea80ce78e4b606f4ea1fa566979b561f`
        );
        const data = await response.json();
        const genre = await data.genres;
        console.log(data);
        setMovie({
          background: data.backdrop_path,
          title: data.original_title,
          poster: data.poster_path,
          release: data.release_date,
          rating: data.vote_average,
          tagline: data.tagline,
          overview: data.overview,
          genre: genre.map((gen: { name: string[] }) => {
            return gen.name;
          }),
          imdb: data.imdb_id,
        });

        setLoading(false);
      };
      fetchMovie();
    }

    if (id?.includes("tv")) {
      // const sliced = id?.slice(0, id.length - 3);

      const fetchMovie = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${sliced}
          ?api_key=ea80ce78e4b606f4ea1fa566979b561f&language=en-US`
        );

        const data = await response.json();
        const genre = await data.genres;
        console.log(data);
        setMovie({
          background: data.backdrop_path,
          title: data.original_name,
          poster: data.poster_path,
          release: data.first_air_date,
          rating: data.vote_average,
          tagline: data.tagline,
          overview: data.overview,
          genre: genre.map((gen: { name: string[] }) => {
            return gen.name;
          }),
          imdb: data.homepage,
        });

        setLoading(false);
      };
      fetchMovie();
    }
  }, [id]);

  const styles = {
    singleMovieContainer: {
      margin: "0rem",
      backgroundImage: `url(https://www.themoviedb.org/t/p/original/${movie?.background})`,
    },
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <main
        className="singleMovieContainer"
        style={styles.singleMovieContainer}>
        <div className="darken">
          <section className="movie">
            <div className="poster">
              <figure>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster}`}
                  alt="Movie poster"
                />
              </figure>
            </div>
            <div className="description">
              <div className="title">
                <div className="movTitle">
                  <h1>
                    <a
                      href={
                        !id?.includes("tv")
                          ? `https://www.imdb.com/title/${movie?.imdb}`
                          : movie?.imdb
                      }
                      target="_blank"
                      rel="noreferrer">
                      {movie?.title} ({movie?.release.slice(0, 4)})
                    </a>
                  </h1>
                </div>
                <p className="genre">
                  {movie?.release} -
                  {movie?.genre.map((movie, i, arr) => {
                    if (i + 1 === arr.length) {
                      return " & " + movie;
                    } else if (i + 1 === arr.length - 1) {
                      return movie;
                    } else {
                      return " " + movie + ", ";
                    }
                  })}
                </p>
              </div>
              <div className="rating">Rating: {movie?.rating}/10</div>
              <div className="tagline">
                <h3>{movie?.tagline}</h3>
              </div>
              <div className="overview">
                <h3>Overview</h3>
                <p>{movie?.overview}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <div className="recommended">
        <h1>Recommended movies</h1>
        <div className="recommendedMovies"></div>
      </div>
    </>
  );
};

export default MovieDetail;
