import { Container, Row, Col, Form, Button, Image, Dropdown, Nav } from "react-bootstrap";
import signup_image from '../images/sign_up.png';

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function sign_up() {

    const [formData, setFormData] = useState({
        username: '',
        acno: '',
        customerid: '',
        password: '',
        phno: '',
        branch: '',
        ifsc_code: '',
        card_no: '',
        beneficiary_ac: '',
    });

    const navigate = useNavigate();

    const [card_type, setcard_type] = useState("visa");

    const { username, acno, customerid, password, phno, branch, ifsc_code, card_no, beneficiary_ac } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(formData.username);
        console.log("Hello");

        try {
            const res = await axios.post("http://localhost:3000/sign_up", {
                username,
                acno,
                customerid,
                password,
                phno,
                branch,
                ifsc_code,
                card_no,
                card_type,
                beneficiary_ac
            })
            console.log(`${res, 'Success'}`)
            console.log(res.data);
            if (res.data == "1") {

                console.log("Rendering login page");
                alert("Signup successfull!");
                navigate("/login");
            }
            else {
                console.log("Failed to render to login page");
                alert("Unable to register, Please Sign_up again");
            }

        }
        catch {
            console.log("Could not able to send data");
        }


    };

    const handleFormField = (e) => {
        console.log("handleformfield", e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSelect = (eventKey) => {
        console.log(eventKey);
        setcard_type(eventKey);
        console.log("card type", card_type);
    }

    const handlelogin = (e) => {
        console.log("Navigate login clicked");
        navigate("/login");
    }

    return (
        <div className="d-flex align-items-center vh-100 bg" >
            <Container className="border border-3" style={{borderColor: "#5cbdb9"}}>
                <Row className="mb-3 p-3">
                    <Col>
                        <h1 style={{ color: "#5cbdb9", textAlign: "center" }}>Online Banking</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Image src={signup_image} ></Image>
                    </Col>
                    <Col>
                        <Row className="mb-3">
                            <Col>
                                <h2 style={{ color: "#5cbdb9", textAlign: "center" }}>Sign up</h2>
                            </Col>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Name" onChange={handleFormField} name="username" value={username} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Account Number" onChange={handleFormField} name="acno" value={acno} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Customer Id</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Customer ID" onChange={handleFormField} name="customerid" value={customerid} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required type="password" placeholder="Enter Password" onChange={handleFormField} name="password" value={password} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Phone Number" onChange={handleFormField} name="phno" value={phno} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Branch</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Branch" onChange={handleFormField} name="branch" value={branch} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>IFSC code</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter IFSC Code" onChange={handleFormField} name="ifsc_code" value={ifsc_code} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Card No</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Card No" onChange={handleFormField} name="card_no" value={card_no} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Beneficiary Account</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Beneficiary Account Number" onChange={handleFormField} name="beneficiary_ac" value={beneficiary_ac} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Dropdown required value={card_type} onSelect={handleSelect}>
                                        <Dropdown.Toggle variant="dark" name="card_type">
                                            Card Type
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu >
                                            <Dropdown.Item eventKey="visa" value="visa">Visa</Dropdown.Item>
                                            <Dropdown.Item eventKey="master" value="master">Master</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    Signup
                                </Button>

                            </div>
                            <Row>
                                <Col className="justify-content-start">{'Already have an account?'}<Button variant="link" onClick={handlelogin}>Log in</Button></Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default sign_up;
