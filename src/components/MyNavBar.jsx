import { Container, Nav, Navbar } from "react-bootstrap";
import { CloudsFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const MyNavBar = () => {
  return (
    <Navbar className="bg-dark">
      <Container fluid>
        <Link to="/" className="nav-link text-light fs-3 fw-bold me-3">
          <div className="d-flex align-items-center">
            <CloudsFill color="white" className="me-1" />
            Weather App
          </div>
        </Link>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;