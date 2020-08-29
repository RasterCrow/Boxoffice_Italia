import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import { useHistory, Link } from "react-router-dom";
import './Navbar.css';

function MyNavbar(props) {
    const { location } = props;
    const [movieToSearch, setMovieToSearch] = useState("")
    const history = useHistory();

    const handleChange = (event) => {
        setMovieToSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        history.push({
            pathname: '/search',
            search: `?${movieToSearch}`,
            state: { movie: movieToSearch }
        })
        //redirect to search page with movies that start with input value
        event.preventDefault();
    }

    return (
        <>
            <Jumbotron className="jumbo" fluid>
                <h1 id="title">BoxOffice Italia</h1>
            </Jumbotron>
            <Navbar bg="primary" variant="dark" className="AllNavBar">
                <Navbar.Brand href="/" className="navHome"><Image src="/assets/home_icon_black.svg" /></Navbar.Brand>
                <Nav
                    className="mr-auto"
                    activeKey={location.pathname}
                //onSelect={(selectedKey) => console.log(selectedKey)}
                >
                    <Nav.Link href="/daily" className="navText">Daily </Nav.Link>
                    <Nav.Link href="/weekly" className="navText">Weekend </Nav.Link>
                    <Nav.Link href="/yearly" className="navText">Yearly</Nav.Link>
                    <Nav.Link href="/all-time" className="navText">All Time</Nav.Link>

                </Nav>
                <Form inline onSubmit={handleSubmit} className="formSearch">
                    <FormControl type="text" placeholder="Search a movie" className="formInput mr-sm-2" onChange={handleChange} />
                    <Button variant="outline-light" type="submit" className="formButton">Search</Button>
                </Form>
            </Navbar>
        </>
    )
}

export default MyNavbar