import { Button } from "react-bootstrap";
import React from "react";
import "./Genres.css";

const Genres = ({ movies, setFilterMovies, fillGenres }) => {
  const genre_maps = fillGenres();
  const handleGenreClick = (genre) => {
    setFilterMovies(
      movies.filter((movie) => movie.genre_ids.includes(genre.id))
    );
  };

  const handleAllClick = () => {
    setFilterMovies(movies);
  };

  return (
    <div className="genre-container">
      <Button onClick={handleAllClick}>
        Total: {genre_maps.map((x) => x.count).reduce((acc, cur) => acc + cur)}
      </Button>
      {genre_maps.map((genre) => (
        <Button
          variant="warning"
          className="btn"
          key={genre.id}
          onClick={() => handleGenreClick(genre)}
        >
          {genre.name} {genre.count}
        </Button>
      ))}
    </div>
  );
};

export default Genres;
