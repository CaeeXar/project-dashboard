import { useState, } from "react";
import { Col, Container, Row, Form, InputGroup, Card, Modal, Button, Image } from "react-bootstrap";
import SimpleBar from 'simplebar-react';

const PROJECT_STATUS = {
    TODO: "orange",
    STABLE: "green",
    DISCARDED: "red",
};

const projects = [
    {
        id: 1,
        title: `OneWord`,
        description: `A simple password-manager.`,
        logo: "oneWord.svg",
        version: `0.0.1`,
        status: "DISCARDED",
    },
    {
        id: 2,
        title: `LiPo-Manager`,
        description: `A tool to manage lithium polymer batteries for RC. Get yourself an overview of all your LiPo's and their status (age, etc.).`,
        logo: null,
        version: `0.0.1`,
        status: "TODO",
    },
];

function prepareDescription(description) {
    if (description.length > 100) description = description.substring(0, 100) + "...";
    return description;
}

function Dashboard() {
    const [filteredProjects, setFilteredProjects] = useState([...projects]);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState({});

    const handleClose = () => setShow(false);
    const onProjectSelection = (project) => {
        setSelected(project);
        setShow(true);
    }
    const onChange = (search) => setFilteredProjects(
        projects.filter(
            (project) => project.description.toLowerCase().includes(search) || project.title.toLowerCase().includes(search)
        )
    );

    return (
        <Container>
            <div style={{ maxHeight: "30vh", marginBottom: "30px" }}>
                <Row >
                    <Col>
                        <h1>Project-Dashboard</h1>
                    </Col>
                </Row>

                <Row >
                    <Col>
                        <InputGroup>
                            <Form.Control placeholder="Search..." onChange={(e) => onChange(e.target.value.toLowerCase())} />
                        </InputGroup>
                    </Col>
                </Row>
            </div>

            <SimpleBar forceVisible="y" autoHide={false} >
                <Row className="g-2" >
                    {filteredProjects.map((project) => (
                        <Col sm={6} md={6} key={project.id}>
                            <Card onClick={e => onProjectSelection(project)}>
                                <Card.Body>
                                    <Card.Title>
                                        <Card.Img src={project.logo} style={{ margin: "auto", textAlign: "center", width: "50px" }} />
                                        {" " + project.title}
                                    </Card.Title>

                                    <Card.Text>{prepareDescription(project.description)}</Card.Text>
                                </Card.Body>

                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <small>Version: {project.version}</small>
                                        </Col>
                                        <Col>
                                            <small>Status: &nbsp;
                                                <span style={{ color: PROJECT_STATUS[project.status] }}>
                                                    {project.status}
                                                </span>
                                            </small>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </SimpleBar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {!!selected.logo ? <Image src={selected.logo} width="50px" /> : null}
                    <Modal.Title style={{ marginLeft: "10px" }}>{selected.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selected.description}
                </Modal.Body>

                <Modal.Footer>
                    <small style={{ position: "absolute", left: "0.75rem" }}>
                        Version: {selected.version} <br />
                        Status: <span style={{ color: PROJECT_STATUS[selected.status] }}>{selected.status}</span>
                    </small>

                    <Button variant="secondary" onClick={handleClose}>
                        Goto {selected.title}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
}

export default Dashboard;