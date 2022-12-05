//import hook useState dan useEffect from react
import { useState, useEffect, Fragment } from "react";

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

//import hook history dan params dari react router dom
import { useNavigate, useParams } from "react-router-dom";

// import sweet alert
import Swal from "sweetalert2";

// import NavbarComp
import NavbarComp from "../../components/NavbarComp";

function EditPost() {
  //state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //state validation
  const [validation, setValidation] = useState({});

  //history
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //hook useEffect
  useEffect(() => {
    //panggil function "getPOstById"
    getPostById();
  }, []);

  //function "getPostById"
  const getPostById = async () => {
    //get data from server
    const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
    //get response data
    const data = await response.data.data;
    //assign data to state
    setImage("");
    setTitle(data.title);
    setContent(data.content);
  };

  const handleFileChange = (e) => {
    //define variable for get value image data
    const imageData = e.target.files[0];

    //check validation file
    if (!imageData.type.match("image.*")) {
      //set state "image" to null
      setImage("");

      return;
    }

    //assign file to state "image"
    setImage(imageData);
  };

  //function "updatePost"
  const updatePost = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("_method", "PUT");

    //send data to server
    await axios
      .post(`http://localhost:8000/api/posts/${id}`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        //redirect
        navigate("/posts");
      })
      .catch(({ response }) => {
        if (response === 422) {
          //assign validation on state
          setValidation(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };
  return (
    <Fragment>
      <NavbarComp />
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

                <Form onSubmit={updatePost}>
                  <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>IMAGE</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                      placeholder="Masukkan Gambar"
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
                    UPDATE
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default EditPost;
