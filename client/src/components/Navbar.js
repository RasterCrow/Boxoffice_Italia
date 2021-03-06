import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import { useHistory } from "react-router-dom";
import './Navbar.css';

function MyNavbar(props) {
    const { location } = props;
    const [movieToSearch, setMovieToSearch] = useState("")
    const history = useHistory();
    //console.log(window.location.pathname)
    //background style
    let backgroundImageArray = ["/assets/banner1.png", "/assets/banner4.jpg", "/assets/banner5.jpg"]
    let randomImage = backgroundImageArray[Math.floor(Math.random() * backgroundImageArray.length)]
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
            {
                window.location.pathname === "/" ? (
                    <Jumbotron className="jumboHome" fluid>
                        <h1 id="title">BoxOffice Italia</h1>
                    </Jumbotron>
                ) :
                    (
                        <Jumbotron className="jumbo" fluid style={{ backgroundImage: `url(${randomImage})` }} >
                            <h1 id="title">BoxOffice Italia</h1>
                        </Jumbotron>
                    )
            }
            <Navbar bg="primary" variant="dark" className="AllNavBar" expand="sm">

                <Navbar.Brand href="/" className="navHome"><Image src="/assets/home_icon_black.svg" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
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
                    <Form inline onSubmit={handleSubmit} className="formSearch" aria-controls="basic-navbar-nav" >
                        <FormControl type="text" placeholder="Search a movie" className="formInput mr-sm-2" onChange={handleChange} />
                        <Button variant="outline-light" type="submit" className="formButton" ><Image src="/assets/search_icon.svg" /></Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default MyNavbar