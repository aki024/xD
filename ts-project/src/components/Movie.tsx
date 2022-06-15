import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  original_title?: string;
  poster_path: string;
  release_date: string;
  id: number;
  first_air_date?: boolean;
}

const Movie = ({
  original_title,
  poster_path,
  release_date,
  id,
  first_air_date,
}: Props) => {
  const [show, setShow] = useState<boolean | undefined>(first_air_date);

  return (
    <>
      {!show && (
        <Link to={`/show/${id}`}>
          <section className="movieCard">
            <div className="picture">
              <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt="Movie poster"
              />
            </div>
            <div className="content">
              <div className="title">
                <h3>{original_title}</h3>

                <p>{release_date}</p>
              </div>
            </div>
          </section>
        </Link>
      )}
      {show && (
        <Link to={`/show/${id}:tv`}>
          <section className="movieCard">
            <div className="picture">
              <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt="Movie poster"
              />
            </div>
            <div className="content">
              <div className="title">
                <h3>{original_title}</h3>

                <p>{release_date}</p>
              </div>
            </div>
          </section>
        </Link>
      )}
    </>
  );
};

export default Movie;
