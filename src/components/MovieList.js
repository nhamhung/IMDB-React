import React from "react";
import { CardDeck, Card, Col } from "react-bootstrap";
import "./MovieList.css";
import { Link } from "react-router-dom";

const MovieList = ({ filterMovies }) => {
  console.log(filterMovies);
  return (
    <CardDeck>
      {filterMovies.map((movie) => {
        return (
          <Col lg={4} md={6} xs={10} key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                />
                <Card.Body>
                  <Card.Title>{movie.original_title}</Card.Title>
                  <Card.Text>{movie.overview.slice(0, 250)}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Average Rating: {movie.vote_average}
                  </small>
                </Card.Footer>
              </Card>
            </Link>
          </Col>
        );
      })}
    </CardDeck>
  );
};

export default MovieList;
