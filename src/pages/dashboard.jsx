import { Row, Button, ListGroup, Tab, Col, Container, Accordion, Table, Modal, Dropdown, Form, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Statememt(props) {
    return (
        <Modal {...props} size="lg" aria-labelledbt="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered modal</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

function dashboard() {
    const [modalshow, setModalShow] = useState(false);


    const [username, setUsename] = useState("");
    const [acno, setAcno] = useState("");
    const [branch, setBranch] = useState("");
    const [ifsc_code, setIfsccode] = useState("");
    const [card_no, setCard_no] = useState("");
    const [card_type, setCard_type] = useState("");
    const [saving_balance, setSaving_balance] = useState("");
    const [current_balance, setCurrent_balance] = useState("");
    const [credit_balance, setCredit_balance] = useState("");
    const [beneficiary_ac, setBeneficiary_ac] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const [customerid, setCustomerid] = useState(data.customerid);

    const [formData, setFormData] = useState({
        ac_type: "Select an account",
        amount: "",
        remarks: "",
    })

    const { ac_type, amount, remarks } = formData;


    console.log("dashboard", customerid);

    const handleLogout = (e) => {
        console.log("Logout clicked");
        navigate("/login");
    }

    useEffect(() => {
        console.log("Useeffect")
        // handledashboard();

        const fetchData = async () => {
            try {
                const res = await axios.post("http://localhost:3000/dashboard", {
                    customerid
                })
                console.log("Backend response", res.data[0]);
                setUsename(res.data[0].name);
                setAcno(res.data[0].ac_no);
                setBranch(res.data[0].branch);
                setIfsccode(res.data[0].ifsc_code);
                setCard_no(res.data[0].card_no);
                setCard_type(res.data[0].card_type);
                setSaving_balance(res.data[0].saving_balance);
                setCurrent_balance(res.data[0].current_balance);
                setCredit_balance(res.data[0].credit_balance);
                setBeneficiary_ac(res.data[0].beneficiary_ac);

                console.log("Usename", username);

            }
            catch {
                console.log("Could not able to retrive user data");
            }
        }
        fetchData();



    }, []);

    const handleAccount = (eventKey) => {
        console.log(eventKey);
        setFormData({ ...formData, ac_type: eventKey })
    }

    const handleBeneficiary_account = (eventKey) => {
        console.log(eventKey);
    }

    const handleForm = async (eventKey) => {
        console.log("Handle submit");
        console.log("Form data", formData, beneficiary_ac);

        try {
            const res = await axios.post("http://localhost:3000/transaction", {
                customerid,
                ac_type,
                amount,
                beneficiary_ac,
                remarks,
            })
        }
        catch {
            console.log("Could not able to send data to backend");
        }
    }

    const handleFormField = (eventKey) => {
        console.log(eventKey.target.value);
        setFormData({ ...formData, [eventKey.target.name]: eventKey.target.value });
    }


    return (
        <div>
            <div className="d-flex justify-content-end">
                <Button style={{ backgroundColor: "#fbe3e8", color: "#000000" }} onClick={handleLogout}>Logout</Button>
            </div>
            <div className="d-flex align-items-center vh-100 bg" >
                <Container className="border border-3" style={{ borderColor: "#5cbdb9" }}>
                    <h1>Greetings {username}</h1>
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                        <Row>
                            <Col sm={4}>
                                <ListGroup>
                                    <ListGroup.Item action eventKey="#link1">
                                        Account Summery
                                    </ListGroup.Item>
                                    <ListGroup.Item action eventKey="#link2">
                                        Transfer fund
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="#link1">
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header><div className="float-left">Saving Account</div>
                                                    <div style={{ marginLeft: '65%' }}>
                                                        Closing balance: {saving_balance}
                                                    </div>
                                                </Accordion.Header>

                                                <Accordion.Body>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Account no: {acno}</td>
                                                                <td>Baranch: {branch}</td>
                                                                <td><Button variant="primary" onClick={() => setModalShow(true)}>View Statement</Button>
                                                                    <Statememt show={modalshow} onHide={() => setModalShow(false)}></Statememt></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Name: {username}</td>
                                                                <td>IFSC code: {ifsc_code}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        <Accordion>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Current Account
                                                    <div style={{ marginLeft: '64%' }}>
                                                        Closing balance: {current_balance}
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Account no: {acno}</td>
                                                                <td>Baranch {branch}</td>
                                                                <td><Button variant="primary" onClick={() => setModalShow(true)}>View Statement</Button>
                                                                    <Statememt show={modalshow} onHide={() => setModalShow(false)}></Statememt></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Name: {username}</td>
                                                                <td>IFSC code: {ifsc_code}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        <Accordion>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>Credit Account
                                                    <div style={{ marginLeft: '65%' }}>
                                                        Closing balance: {credit_balance}
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Card No: {card_no}</td>
                                                                <td>Type: {card_type}</td>
                                                                <td><Button variant="primary" onClick={() => setModalShow(true)}>View Statement</Button>
                                                                    <Statememt show={modalshow} onHide={() => setModalShow(false)}></Statememt></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Name: {username}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#link2">
                                        <Container className="border border-3" style={{ borderColor: "#5cbdb9" }}>
                                            <Row>
                                                <Col><h2>Transfer Fund</h2></Col>
                                            </Row>
                                            <Form>
                                                <Form.Group as={Row} className="mb-3 p-3">
                                                    <Form.Label column sm="3">
                                                        Choose an account
                                                    </Form.Label>
                                                    <Col>
                                                        <Dropdown as={ButtonGroup}>
                                                            <Dropdown.Toggle id="dropdown-item-button" >{ac_type}</Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => handleAccount('saving')} >Saving Account</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => handleAccount('current')} >Current Account</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => handleAccount('credit')} >Credit Account</Dropdown.Item>
                                                            </Dropdown.Menu>

                                                        </Dropdown>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3 p-3">
                                                    <Form.Label column sm="3">
                                                        Beneficiary Account
                                                    </Form.Label>
                                                    <Col>
                                                        <Dropdown as={ButtonGroup}>
                                                            <Dropdown.Toggle id="dropdown-item-button">{beneficiary_ac}</Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => handleBeneficiary_account({ beneficiary_ac })}>{beneficiary_ac}</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Form.Group>


                                                <Form.Group as={Row} className="mb-3 p-3">
                                                    <Form.Label column sm="3">
                                                        Amount in Ruppes</Form.Label>
                                                    <Col sm="5">
                                                        <Form.Control required type="text" placeholder="Enter Ammount" onChange={handleFormField} name="amount" value={amount}></Form.Control>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3 p-3">
                                                    <Form.Label column sm="3">Remarks</Form.Label>
                                                    <Col sm="5">
                                                        <Form.Control required type="text" placeholder="Enter Remarks" onChange={handleFormField} name="remarks" value={remarks}></Form.Control>
                                                    </Col>
                                                </Form.Group>
                                                <div className="d-flex justify-content-center">
                                                    <Row className="p-3"><Col column sm="5"><Button>Reset</Button></Col>
                                                        <Col column sm="1"><Button onClick={handleForm}>Send</Button></Col></Row>
                                                </div>
                                            </Form>
                                        </Container>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </div>
        </div>
    )
}

export default dashboard;
