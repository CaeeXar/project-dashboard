import { useState, } from "react";
import { Col, Container, Row, Form, InputGroup, Card } from "react-bootstrap";
import SimpleBar from 'simplebar-react';

const PROJECT_STATUS = {
    TODO: "orange",
    STABLE: "green",
    DISCARDED: "red",
};

const projects = [
    {
        title: `OneWord`,
        description: `A simple password-manager.`,
        logo: "oneWord.svg",
        version: `0.0.1`,
        status: "DISCARDED",
    },
    {
        title: `LiPo-Manager`,
        description: `A tool to manage lithium polymer batteries for RC.
         Get yourself an overview of all your LiPo's and their status (age, etc.).`,
        logo: "",
        version: `0.0.1`,
        status: "TODO",
    },
];

function Dashboard() {
    const [filteredProjects, setFilteredProjects] = useState([...projects]);

    const onChange = (search) => {
        setFilteredProjects(
            projects.filter((project) =>
                project.description.toLowerCase().includes(search) || project.title.toLowerCase().includes(search)
            )
        );
    }

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
                    {filteredProjects.map((project, idx) => (
                        <Col sm={6} md={6} key={idx}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <Card.Img src={project.logo} style={{ margin: "auto", textAlign: "center", width: "50px" }} />
                                        {" " + project.title}
                                    </Card.Title>

                                    <Card.Text>{project.description}</Card.Text>
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
        </Container >
    );
}

export default Dashboard;