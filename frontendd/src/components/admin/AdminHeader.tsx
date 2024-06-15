import { Navbar, Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

function AdminHeader() {

    return(
        <Navbar bg="light" expand="lg" className="ml-5 mr-5 px-3" >
            <Navbar.Brand as={Link} to="/">Traveler Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link as={Link} to="/allUsers">All Users</Nav.Link>
                    <Nav.Link as={Link} to="/allPosts">All Posts</Nav.Link>
                    <Nav.Link as={Link} to="/createPost">
                        <FontAwesomeIcon icon={faPlus} /> New Post
                    </Nav.Link>
                    <Nav.Link as={Link} to="/logout">Log out</Nav.Link>
                    <Nav.Link as={Link} to="/profile">
                        <FontAwesomeIcon icon={faUser} />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AdminHeader;