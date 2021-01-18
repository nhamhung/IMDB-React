import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

const URL_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_MY_API_KEY;

const MovingDetailPage = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);

  // console.log(id);
  useEffect(() => {
    async function fetchData() {
      const url = `${URL_ENDPOINT}/movie/${id}?api_key=${API_KEY}&language=en-US`;
      const response = await fetch(url);
      const data = await response.json();
      setMovieDetail(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <ClipLoader color="red" size={150} />
      ) : (
        <Container>
          <Card>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`}
            />
            <Card.Body>
              <Card.Title>{movieDetail.original_title}</Card.Title>
              <Card.Text>{movieDetail.overview}</Card.Text>
            </Card.Body>
            {/* <Card.Footer>{movieDetail.status}</Card.Footer> */}
          </Card>
        </Container>
      )}
    </div>
  );
};

export default MovingDetailPage;
