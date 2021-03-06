import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// export default ({ currentUser, logout }) => {
const NavbarComponent = ({ currentUser, logout, history }) => {
  const display = currentUser ? (
    // <div>
    //   <p>{currentUser.username}</p>
    //   <button onClick={logout}>Log Out</button>
    // </div>
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
    {/* <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between"> */}
      {/* <Form className="align-self-center">
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form> */}
      {/* <Nav className="justify-content-end"> */}
        <Nav.Link href="#/posts/explore">
          <FontAwesomeIcon icon="search" size="lg" />
        </Nav.Link>
        <Nav.Link href="#/posts/new">
          <FontAwesomeIcon icon="plus" size="lg" />
        </Nav.Link>
        <NavDropdown title={<FontAwesomeIcon icon={['far', 'user']} size="lg" />}>
          <NavDropdown.Item href={`#/${currentUser.username}`}>
            {currentUser.username}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => logout().then(() => history.push('/login'))}>
            <FontAwesomeIcon icon="sign-out-alt" size="lg" />     Sign Out
          </NavDropdown.Item>
        </NavDropdown>
      {/* </Nav> */}
    </Navbar.Collapse>
  ) : (
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          {/* <Nav.Link href="#signup">Sign Up</Nav.Link>
          <Nav.Link href="#login">Login</Nav.Link> */}
          <Link to="/signup" className="nav-link">Sign Up</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </Nav>
      </Navbar.Collapse>

    );

  return (
    <Navbar fixed="top" collapseOnSelect bg="light" expand={true} className="navbar-default">
      <Container className="navbar-container">
      <Navbar.Brand href="#"><FontAwesomeIcon icon={['fab', 'instagram']} size="2x" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {display}
      </Container>
    </Navbar>
  );
};

export default withRouter(NavbarComponent);