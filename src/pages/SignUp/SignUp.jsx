import React, { useContext } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
  Spinner,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import image from "../../assets/Privacy policy-rafiki.svg";
import { AuthContext } from "../../contexts/UserContext";

const SignUp = () => {
  const { signUp, signInGoogle, updateUserProfile, loading, setLoading } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    const email = form.email.value;
    const password = form.password.value;
    signUp(email, password)
      .then((result) => {
        form.reset();
        updateUserProfile(name, photoUrl);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const handleSignInWithGoogle = () => {
    signInGoogle()
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="d-flex vh-100 align-items-center">
      <Container className="py-2">
        <Row className="justify-content-center align-items-center">
          <Col md="5">
            <img className="img-fluid" src={image} alt="" />
          </Col>
          <Col md="5">
            <Card className="cardd">
              <Card.Body className="p-4 p-lg-5">
                <h3 className="fs-2  text-center mb-4">Sign Up</h3>
                <Form onSubmit={handleSignUp}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      className="py-2"
                      type="text"
                      placeholder="name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPhotoUrl">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control
                      name="photoUrl"
                      className="py-2"
                      type="text"
                      placeholder="photo url"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      className="py-2"
                      type="email"
                      placeholder="email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      className="py-2"
                      type="password"
                      placeholder="password"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Button
                      variant="dark"
                      className="w-100 fw-semibold"
                      type="submit"
                    >
                      {loading && (
                        <Spinner
                          animation="border"
                          variant="light"
                          size="sm"
                          className="me-2"
                        />
                      )}
                      Sign Up
                    </Button>
                  </Form.Group>
                </Form>
                <p className="text-center">Or Sign Up with</p>
                <button
                  onClick={handleSignInWithGoogle}
                  className="btn btn-light p-3 rounded-circle d-flex align-items-center justify-content-center gap-2 mx-auto"
                >
                  <FcGoogle></FcGoogle>
                </button>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-none text-dark fw-semibold"
                  >
                    Login
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
