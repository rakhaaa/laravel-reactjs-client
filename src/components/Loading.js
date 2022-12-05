import { Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading">
      <Container>
        <Row>
          <Col sm="auto">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Loading;
