//import hook react
import React, { useState, useEffect } from "react";

//import hook useHitory from react router dom
import { useNavigate } from "react-router-dom";

//import axios
import axios from "axios";

//import component Bootstrap React
import {
  Container,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";

//import react router dom
import { Link } from "react-router-dom";

// import cookies
import Cookies from "js-cookie";

function Dashboard() {
  //state user
  const [user, setUser] = useState({});

  //define history
  const navigate = useNavigate();

  //get token
  const token = Cookies.get('token');

  //function "fetchData"
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://localhost:8000/api/user").then((response) => {
      //set response user to state
      setUser(response.data);
    });
  };

  //hook useEffect
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      navigate("/login");
    }

    //call function "fetchData"
    fetchData();
  }, []);

  //function logout
  const logoutHanlder = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch Rest API
    await axios.post("http://localhost:8000/api/logout").then(() => {
       //remove token from cookies
       Cookies.remove("token");

      //redirect halaman login
      navigate("/login");
    });
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/" className="text-uppercase">Selamat Datang, <strong>{user.name}</strong>{" "}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/posts" className="nav-link">
                POSTS
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Button variant="danger" size="lg" onClick={logoutHanlder}>
                LOGOUT
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Dashboard;
