import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ModalShow } from "../Modals/ModalShow";

export default function NavCom(props) {
  const [show, setShow] = useState(false);
  const checkClick = () => {
    setShow(true);
  };
  const closeBFun = () => {
    setShow(false);
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">{props.heading}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link onClick={checkClick}>Add User!</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalShow heading="Enter new User!" show={show} closeB={closeBFun} refreshStateChange={props.refreshStateChange}/>
    </>
  );
}
