import { Navbar, Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";

function Header() {

    return(
        <Navbar bg="light" expand="lg" className="ml-5 mr-5 px-3" >
            <Navbar.Brand as={Link} to="/">Traveler Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default Header;