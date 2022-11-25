//import component Bootstrap React
import {
  Card,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";

import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/" className="text-uppercase">Laravel + React</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/login"
                className="nav-link btn btn-lg text-white btn-success rounded shadow-sm me-3"
              >
                LOGIN
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className="nav-link btn btn-lg text-white btn-primary rounded shadow-sm"
              >
                REGISTER
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow-sm">
              <Card.Body className="p-4">
                <h1>EXPRESS.JS + VUE.JS</h1>
                <p class="lead">
                  Tutorial FullStack Express.js dan React.js oleh{" "}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
