//import hook useState from react
import { useState } from "react";

//import component Bootstrap React
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

//import axios
import axios from "axios";

//import hook navigate dari react router dom
import { useNavigate } from "react-router-dom";

function CreatePost() {
  //state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //state validation
  const [validation, setValidation] = useState({});

  //navigate
  const navigate = useNavigate();

  //   function handleChange
  const handleFileChange = (e) => {
    const imageData = e.target.files[0];

    // check validation image
    if (!imageData.type.match("image.*")) {
      // set state image to null
      setImage("");

      return;
    }

    // assign file to state "image"
    setImage(imageData);
  };

  //method "storePost"
  const storePost = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);

    //send data to server
    await axios
      .post(`http://localhost:8000/api/posts`, formData)
      .then(() => {
        //redirect
        navigate("/posts");
      })
      .catch((error) => {
        //assign validation on state
        setValidation(error.response.data);
      });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.param} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}

              <Form onSubmit={storePost}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>IMAGE</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>TITLE</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>CONTENT</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Masukkan Content"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  SIMPAN
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
