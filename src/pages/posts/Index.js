//import hook useState dan useEffect from react
import { useState, useEffect, Fragment } from "react";

//import react router dom
import { Link } from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table, Badge } from "react-bootstrap";

//import axios
import axios from "axios";

// import sweet alert
import Swal from "sweetalert2";

// import NavbarComp
import NavbarComp from "../../components/NavbarComp";

// import Loading
import Loading from "../../components/Loading";

function PostIndex() {
  //define state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);

  //function "fetchData"
  const fectData = async () => {
    setLoading(true);
    //fetching
    const response = await axios.get(`http://localhost:8000/api/posts`);
    //get response data
    const result = await response.data.data.data;

    //assign response data to state "posts"
    setLoading(false);
    setPosts(result);
  };

  //function "deletePost"
  const deletePost = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Yakin hapus data ini?",
      text: "Data yang dihapus tidak bisa di kembalikan lagi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus data ini",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    //sending
    await axios
      .delete(`http://localhost:8000/api/posts/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        //panggil function "fetchData"
        fectData();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <Fragment>
      <NavbarComp />
      <Container className="mt-3">
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow-sm">
              <Card.Body>
                <Button
                  as={Link}
                  to="/posts/create"
                  variant="success"
                  className="mb-3"
                >
                  TAMBAH POST
                </Button>
                <Table responsive bordered hover className="mb-1">
                  <thead>
                    <tr>
                      <th>NO.</th>
                      <th>IMAGE</th>
                      <th>TITLE</th>
                      <th>CONTENT</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <tr key={post.id}>
                        <td>{index + 1}</td>
                        <td className="text-center">
                          <img
                            src={`http://localhost:8000/storage/posts/${post.image}`}
                            alt={post.title}
                            width="150"
                            className="rounded-3"
                          />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td className="text-center">
                          <Button
                            as={Link}
                            to={`/posts/edit/${post.id}`}
                            variant="primary"
                            size="sm"
                            className="me-2"
                          >
                            EDIT
                          </Button>
                          <Button
                            onClick={() => deletePost(post.id)}
                            variant="danger"
                            size="sm"
                          >
                            DELETE
                          </Button>
                          <Badge bg="primary" ></Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default PostIndex;
