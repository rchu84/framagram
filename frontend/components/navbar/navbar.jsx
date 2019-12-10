import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';

export default ({ currentUser, logout }) => {
  const display = currentUser ? (
    // <div>
    //   <p>{currentUser.username}</p>
    //   <button onClick={logout}>Log Out</button>
    // </div>
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
      <Form className="align-self-center">
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
      <Nav className="justify-content-end">
        <Nav.Link href="#/posts/new">New Post</Nav.Link>
        <NavDropdown title={currentUser.username}>
          <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  ) : (
      // <div>
      //   <Link className="btn" to="/signup">Sign Up</Link>
      //   <Link className="btn" to="/login">Log In</Link>
      // </div>
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href="#signup">Sign Up</Nav.Link>
          <Nav.Link href="#login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>

    );

  return (
    <Navbar bg="light" expand="lg" className="navbar-default">
      <Container>
      <Navbar.Brand href="#">Framagram</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {display}
      </Container>
    </Navbar>
  );
};