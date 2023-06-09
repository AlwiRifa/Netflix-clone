import axios from "./axios.js";
import React, { useEffect, useState } from "react";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(fetchUrl);
      setMovies(requests.data.results);
      return requests;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={
              (isLargeRow ? movie.poster_path : movie.backdrop_path)
                ? `${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`
                : "https://image.tmdb.org/t/p/original/undefined "
            }
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
