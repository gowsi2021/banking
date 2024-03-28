import { Container, Row, Col, Form, Button, Image, Dropdown } from "react-bootstrap";
import login_image from '../images/login.jpg';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function login() {
    const [formData, setFormData] = useState({
        customerid: "",
        password: ""
    });

    const navigate = useNavigate();

    const { customerid, password } = formData;

    const handleFormField = (e) => {
        console.log("handling formdata", e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login clicked");
        console.log(formData);

        try {
            const res = await axios.post("http://localhost:3000/login", {
                customerid,
                password
            })
            if (res.data == "1") {
                console.log("Rendering Dashboard page");
                alert("Login successfull!");
                navigate("/dashboard", { state: formData });
            }
            else {
                console.log("Failed to render to login page");
                alert("Invalid CustomerID and Password");
            }
        }
        catch {
            console.log("Could not able to send data");
        }
    }

    const handlesignup = async (e) => {
        navigate("/");
    }


    return (
        <div className="d-flex align-items-center vh-100">
            <Container className="w-50 p-3 border border-3" style={{ background: "#ffffff" }}>
                <Row className="mb-3">
                    <Col>
                        <h1 style={{ color: "#5cbdb9", textAlign: "center" }}>Online Banking</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Image src={login_image} width={450} height={450} />
                    </Col>
                    <Col>
                        <Row className="mb-3">
                            <Col>
                                <h2 style={{ color: "#5cbdb9", textAlign: "center" }}>Login</h2>
                            </Col>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>Customer ID</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Customer ID" onChange={handleFormField} name="customerid" value={customerid} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">

                                <Form.Group as={Col}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required type="password" placeholder="Enter Password" onChange={handleFormField} name="password" value={password} />
                                </Form.Group>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                            <Row>
                                <Col className="justify-content-start">{"Don't have an account?"}<Button variant="link" onClick={handlesignup}>Sign up</Button></Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default login;