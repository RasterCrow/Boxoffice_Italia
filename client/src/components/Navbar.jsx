import React, { useState, useEffect, useMemo } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

const backgroundImageArray = [
  "/assets/banner1.webp",
  "/assets/banner2.webp",
  "/assets/banner3.webp",
  "/assets/banner4.webp",
  "/assets/banner5.webp",
];

function MyNavbar(props) {
  const { location } = props;
  const [movieToSearch, setMovieToSearch] = useState("");
  const [randomImage, setRandomImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    //background style
    setRandomImage(
      backgroundImageArray[
        Math.floor(Math.random() * backgroundImageArray.length)
      ]
    );
  }, []);

  const handleChange = (event) => {
    setMovieToSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/search",
      search: `?${movieToSearch}`,
      state: { movie: movieToSearch },
    });
    //redirect to search page with movies that start with input value
  };

  return (
    <>
      {/* {window.location.pathname === "/" ? (
        <></>
      ) : (
        <Jumbotron
          className="jumbo"
          fluid
          style={{ backgroundImage: `url(${randomImage})` }}
        >
          <h1 id="title">BoxOffice Italia</h1>
        </Jumbotron>
      )} */}
      <Navbar bg="primary" variant="dark" className="AllNavBar" expand="sm">
        <Navbar.Brand className="navHome">
          <Link to="/" style={{ text: "white" }} className="navHome">
            <Image src="/assets/home_icon_black.svg" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={location.pathname}>
            <Link to="/daily" style={{ text: "white" }} className="navText">
              Daily{" "}
            </Link>
            <Link to="/weekly" className="navText">
              Weekend{" "}
            </Link>
            <Link to="/yearly" className="navText">
              Yearly
            </Link>
            <Link to="/all-time" className="navText">
              All Time
            </Link>
          </Nav>
          <Form
            inline
            onSubmit={handleSubmit}
            className="formSearch"
            aria-controls="basic-navbar-nav"
          >
            <FormControl
              type="text"
              placeholder="Search a movie"
              className="formInput mr-sm-2"
              onChange={handleChange}
            />
            <Button
              variant="outline-light"
              type="submit"
              className="formButton"
            >
              <Image src="/assets/search_icon.svg" />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default MyNavbar;
