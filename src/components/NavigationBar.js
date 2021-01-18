import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Link to="/">
          <img
            src="https://www.vhv.rs/dpng/d/451-4513756_imdb-png-transparent-png.png"
            width="120"
            height="50"
            className="d-inline-block align-top"
          />
        </Link>
        <Nav className="mr-auto">
          <Link to="/movies/top_rated">Top Rated</Link>
          <Link to="/movies/upcoming">Upcoming</Link>
          <Link to="/">Now Playing</Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
