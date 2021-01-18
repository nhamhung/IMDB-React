import React from "react";
import { useState, useEffect } from "react";
import PaginationBar from "../components/PaginationBar";
import MovieList from "../components/MovieList";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Form,
  Col,
  Row,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import Genres from "../components/Genres";
import "./MovieListPage.css";

const API_KEY = process.env.REACT_APP_MY_API_KEY;
const URL_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const MovieListPage = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTerm, setFilterTerm] = useState("");
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = `${URL_ENDPOINT}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${pageNum}`;
      const urlGenre = `${URL_ENDPOINT}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
      const genresponse = await fetch(urlGenre);
      const genres = await genresponse.json();
      const response = await fetch(url);
      const data = await response.json();
      setTotalPageNum(data.total_pages);
      setMovies(data.results);
      setGenres(genres.genres);
      setLoadingGenres(false);
      setFilterMovies(data.results);
      setIsLoading(false);
    }
    fetchData();
  }, [type, pageNum]);

  useEffect(() => {
    setFilterMovies(
      movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(filterTerm.toLowerCase())
      )
    );
  }, [filterTerm]);

  const fillGenres = () => {
    const d = {};
    movies.forEach((movie) => {
      for (var x of movie.genre_ids) {
        if (d[x] !== undefined) {
          d[x]++;
        } else {
          d[x] = 1;
        }
      }
    });
    return genres.map((genre) => {
      if (d[genre.id] !== undefined) {
        return { ...genre, count: d[genre.id] };
      } else {
        return { ...genre, count: 0 };
      }
    });
  };

  const sortMostPopular = () => {
    let newMovies = [...filterMovies];
    newMovies.sort((a, b) => b.vote_average - a.vote_average);
    setFilterMovies(newMovies);
  };

  const sortLeastPopular = () => {
    let newMovies = [...filterMovies];
    newMovies.sort((a, b) => a.vote_average - b.vote_average);
    setFilterMovies(newMovies);
  };

  return (
    <div>
      <Row>
        <Col lg={3}>
          <DropdownButton
            as={ButtonGroup}
            key="success"
            id="dropdown-variants-success"
            variant="success"
            title="Sort By"
            className="dropdown-btn"
          >
            <Dropdown.Item eventKey="1" onClick={sortMostPopular}>
              Most Popular
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={sortLeastPopular}>
              Least Popular
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col lg={9}>
          <PaginationBar
            pageNum={pageNum}
            totalPageNum={totalPageNum}
            setPageNum={setPageNum}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={3}>
          {loadingGenres ? (
            <ClipLoader color="red" size={150} />
          ) : (
            <Genres
              fillGenres={fillGenres}
              movies={movies}
              setFilterMovies={setFilterMovies}
            />
          )}
        </Col>
        <Col lg={9}>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Movie Filter</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => setFilterTerm(e.target.value)}
              />
            </Form.Group>
          </Form>
          {isLoading ? (
            <ClipLoader color="red" size={150} />
          ) : (
            <MovieList filterMovies={filterMovies} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MovieListPage;
